package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.AdminUser;
import com.shankarchaudhary.portfolio.repository.AdminUserRepository;
import com.shankarchaudhary.portfolio.security.JwtService;
import com.shankarchaudhary.portfolio.security.RateLimiterService;
import com.shankarchaudhary.portfolio.security.SecurityUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RateLimiterService rateLimiterService;

    @Value("${portfolio.admin.authorized-mobile:9905340058}")
    private String authorizedMobile;

    @Value("${portfolio.admin.max-failed-attempts:5}")
    private int maxFailedAttempts;

    @Value("${portfolio.admin.lockout-minutes:15}")
    private int lockoutMinutes;

    public AuthController(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            RateLimiterService rateLimiterService
    ) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.rateLimiterService = rateLimiterService;
    }

    @GetMapping("/auth/status")
    public ResponseEntity<?> getAuthStatus() {
        boolean initialized = adminUserRepository.count() > 0;
        Map<String, Object> resp = new HashMap<>();
        resp.put("initialized", initialized);
        resp.put("authorizedMobile", authorizedMobile);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/auth/setup")
    public ResponseEntity<?> setupAdmin(@RequestBody Map<String, String> request) {
        if (adminUserRepository.count() > 0) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Admin account is already initialized. Please log in."));
        }

        String rawMobile = request.get("mobileNumber");
        String password = request.get("password");
        String normMobile = SecurityUtils.normalizeMobile(rawMobile);
        String normAuth = SecurityUtils.normalizeMobile(authorizedMobile);

        if (normMobile == null || !normMobile.equals(normAuth)) {
            logger.warn("[AUTH-SETUP] Attempt with unauthorized mobile: {}", SecurityUtils.maskMobile(rawMobile));
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Only the authorized mobile number (" + authorizedMobile + ") can initialize the admin account."));
        }

        if (password == null || password.trim().length() < 8) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Password must be at least 8 characters long."));
        }

        // Generate a 128-bit cryptographically secure Emergency Recovery Key
        String generatedRecoveryKey = SecurityUtils.generateRecoveryKey();

        AdminUser admin = new AdminUser(normAuth, passwordEncoder.encode(password.trim()));
        admin.setRecoveryPinHash(passwordEncoder.encode(generatedRecoveryKey));
        admin.setLastLoginAt(LocalDateTime.now());
        adminUserRepository.save(admin);

        logger.info("[AUTH-SETUP] Admin account initialized successfully for mobile: {}", SecurityUtils.maskMobile(normAuth));

        String token = jwtService.generateToken(normAuth);
        Map<String, Object> resp = new HashMap<>();
        resp.put("token", token);
        resp.put("mobileNumber", normAuth);
        resp.put("recoveryKey", generatedRecoveryKey);
        resp.put("message", "Admin account initialized successfully. Save your Emergency Recovery Key securely.");
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request, HttpServletRequest servletRequest) {
        String clientIp = servletRequest.getRemoteAddr();
        String rawMobile = request.get("mobileNumber");
        String password = request.get("password");

        logger.info("[AUTH-LOGIN] Login attempt received from IP: {}, mobile: {}", clientIp, SecurityUtils.maskMobile(rawMobile));

        // 1. Check IP rate limit
        if (rateLimiterService.isRateLimited(clientIp)) {
            logger.warn("[AUTH-LOGIN] IP {} is temporarily rate-limited", clientIp);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Too many failed attempts. Login locked for " + lockoutMinutes + " minutes."));
        }

        String normMobile = SecurityUtils.normalizeMobile(rawMobile);
        String normAuth = SecurityUtils.normalizeMobile(authorizedMobile);

        // 2. Mobile validation
        if (normMobile == null || !normMobile.equals(normAuth)) {
            rateLimiterService.recordFailedAttempt(clientIp);
            logger.warn("[AUTH-LOGIN] Rejected: Mobile {} does not match authorized mobile", SecurityUtils.maskMobile(rawMobile));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Unauthorized mobile number. Only the registered portfolio owner is allowed."));
        }

        // 3. User existence check (try normalized then raw if needed)
        Optional<AdminUser> adminOpt = adminUserRepository.findByMobileNumber(normAuth);
        if (adminOpt.isEmpty() && authorizedMobile != null) {
            adminOpt = adminUserRepository.findByMobileNumber(authorizedMobile);
        }

        if (adminOpt.isEmpty()) {
            logger.warn("[AUTH-LOGIN] Rejected: Admin account not found in database for mobile {}", SecurityUtils.maskMobile(normAuth));
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Admin account not initialized. Please complete initial setup first."));
        }

        AdminUser admin = adminOpt.get();

        // 4. Account-level lockout check
        if (admin.isLocked()) {
            logger.warn("[AUTH-LOGIN] Rejected: Account is locked until {}", admin.getLockoutUntil());
            return ResponseEntity.status(HttpStatus.LOCKED)
                    .body(Map.of("error", "Account is temporarily locked due to repeated failed attempts. Please use Forgot Password or wait."));
        }

        // 5. Password verification
        if (password == null || !passwordEncoder.matches(password.trim(), admin.getPasswordHash())) {
            int attempts = admin.getFailedLoginAttempts() + 1;
            admin.setFailedLoginAttempts(attempts);
            rateLimiterService.recordFailedAttempt(clientIp);

            logger.warn("[AUTH-LOGIN] Password verification failed. Failed attempt {} of {}", attempts, maxFailedAttempts);

            if (attempts >= maxFailedAttempts) {
                admin.setLockoutUntil(LocalDateTime.now().plusMinutes(lockoutMinutes));
                adminUserRepository.save(admin);
                logger.warn("[AUTH-LOGIN] Account locked for {} minutes due to {} failed attempts", lockoutMinutes, attempts);
                return ResponseEntity.status(HttpStatus.LOCKED)
                        .body(Map.of("error", "Account locked for " + lockoutMinutes + " minutes due to " + attempts + " failed attempts."));
            }
            adminUserRepository.save(admin);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials. Attempt " + attempts + " of " + maxFailedAttempts + "."));
        }

        // 6. Success: reset rate limits and record login
        rateLimiterService.resetAttempts(clientIp);
        admin.setFailedLoginAttempts(0);
        admin.setLockoutUntil(null);
        admin.setLastLoginAt(LocalDateTime.now());
        adminUserRepository.save(admin);

        logger.info("[AUTH-LOGIN] Login successful for admin {}. Issuing JWT token.", SecurityUtils.maskMobile(admin.getMobileNumber()));

        String token = jwtService.generateToken(admin.getMobileNumber());
        Map<String, Object> resp = new HashMap<>();
        resp.put("token", token);
        resp.put("mobileNumber", admin.getMobileNumber());
        resp.put("lastLoginAt", admin.getLastLoginAt());
        resp.put("message", "Login successful");
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/auth/recover")
    public ResponseEntity<?> recoverPassword(@RequestBody Map<String, String> request) {
        String rawMobile = request.get("mobileNumber");
        String secretOrPin = request.get("recoveryKey");
        String newPassword = request.get("newPassword");

        String normMobile = SecurityUtils.normalizeMobile(rawMobile);
        String normAuth = SecurityUtils.normalizeMobile(authorizedMobile);

        logger.info("[AUTH-RECOVER] Password recovery attempt for mobile: {}", SecurityUtils.maskMobile(rawMobile));

        if (normMobile == null || !normMobile.equals(normAuth)) {
            logger.warn("[AUTH-RECOVER] Rejected: Mobile {} does not match authorized mobile", SecurityUtils.maskMobile(rawMobile));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Unauthorized mobile number. Only the registered portfolio owner can recover this account."));
        }

        if (secretOrPin == null || secretOrPin.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Recovery key is required."));
        }

        if (newPassword == null || newPassword.trim().length() < 8) {
            return ResponseEntity.badRequest().body(Map.of("error", "New password must be at least 8 characters long."));
        }

        Optional<AdminUser> adminOpt = adminUserRepository.findByMobileNumber(normAuth);
        if (adminOpt.isEmpty() && authorizedMobile != null) {
            adminOpt = adminUserRepository.findByMobileNumber(authorizedMobile);
        }

        if (adminOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Admin account not found. Please complete initial setup first."));
        }

        AdminUser admin = adminOpt.get();
        String cleanKey = SecurityUtils.cleanEnvValue(secretOrPin);

        // 1. Verify key against stored BCrypt hash
        boolean keyValid = admin.getRecoveryPinHash() != null && passwordEncoder.matches(cleanKey, admin.getRecoveryPinHash());

        // 2. Or verify against emergency environment variable on deployment host
        String envEmergencyKey = SecurityUtils.cleanEnvValue(System.getenv("ADMIN_RECOVERY_KEY"));
        if (envEmergencyKey == null || envEmergencyKey.isEmpty()) {
            envEmergencyKey = SecurityUtils.cleanEnvValue(System.getenv("EMERGENCY_RECOVERY_KEY"));
        }
        boolean envEmergencyValid = envEmergencyKey != null && !envEmergencyKey.isEmpty() && envEmergencyKey.equals(cleanKey);

        if (!keyValid && !envEmergencyValid) {
            logger.warn("[AUTH-RECOVER] Invalid recovery key provided for mobile {}", SecurityUtils.maskMobile(normAuth));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid Emergency Recovery Key. If you never received one, set EMERGENCY_RECOVERY_KEY or INITIAL_ADMIN_PASSWORD on your server."));
        }

        // Generate a fresh 128-bit Emergency Recovery Key
        String newRecoveryKey = SecurityUtils.generateRecoveryKey();

        admin.setPasswordHash(passwordEncoder.encode(newPassword.trim()));
        admin.setRecoveryPinHash(passwordEncoder.encode(newRecoveryKey));
        admin.setFailedLoginAttempts(0);
        admin.setLockoutUntil(null);
        admin.setUpdatedAt(LocalDateTime.now());
        adminUserRepository.save(admin);

        logger.info("[AUTH-RECOVER] Password successfully reset for mobile {}. Fresh recovery key generated.", SecurityUtils.maskMobile(admin.getMobileNumber()));

        String token = jwtService.generateToken(admin.getMobileNumber());
        Map<String, Object> resp = new HashMap<>();
        resp.put("token", token);
        resp.put("mobileNumber", admin.getMobileNumber());
        resp.put("recoveryKey", newRecoveryKey);
        resp.put("message", "Password recovered successfully! Please save your new Emergency Recovery Key.");
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/admin/auth/me")
    public ResponseEntity<?> getAdminProfile(@AuthenticationPrincipal AdminUser admin) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("id", admin.getId());
        resp.put("mobileNumber", admin.getMobileNumber());
        resp.put("lastLoginAt", admin.getLastLoginAt());
        resp.put("hasRecoveryKey", admin.getRecoveryPinHash() != null && !admin.getRecoveryPinHash().isEmpty());
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/admin/auth/change-password")
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal AdminUser admin,
            @RequestBody Map<String, String> request
    ) {
        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        if (!passwordEncoder.matches(currentPassword != null ? currentPassword : "", admin.getPasswordHash())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Current password does not match."));
        }

        if (newPassword == null || newPassword.trim().length() < 8) {
            return ResponseEntity.badRequest().body(Map.of("error", "New password must be at least 8 characters."));
        }

        admin.setPasswordHash(passwordEncoder.encode(newPassword.trim()));
        admin.setUpdatedAt(LocalDateTime.now());
        adminUserRepository.save(admin);

        return ResponseEntity.ok(Map.of("message", "Password updated successfully."));
    }

    @PostMapping("/admin/auth/generate-recovery-key")
    public ResponseEntity<?> generateNewRecoveryKey(
            @AuthenticationPrincipal AdminUser admin,
            @RequestBody Map<String, String> request
    ) {
        String currentPassword = request.get("currentPassword");
        if (!passwordEncoder.matches(currentPassword != null ? currentPassword : "", admin.getPasswordHash())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Current password is required to generate a new recovery key."));
        }

        String newKey = SecurityUtils.generateRecoveryKey();
        admin.setRecoveryPinHash(passwordEncoder.encode(newKey));
        admin.setUpdatedAt(LocalDateTime.now());
        adminUserRepository.save(admin);

        return ResponseEntity.ok(Map.of(
                "recoveryKey", newKey,
                "message", "New Emergency Recovery Key generated. Save it securely."
        ));
    }

    @PostMapping("/admin/auth/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
