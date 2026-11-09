package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.AdminUser;
import com.shankarchaudhary.portfolio.repository.AdminUserRepository;
import com.shankarchaudhary.portfolio.security.JwtService;
import com.shankarchaudhary.portfolio.security.RateLimiterService;
import jakarta.servlet.http.HttpServletRequest;
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

    @Value("${portfolio.admin.recovery-key:SHANKAR_ADMIN_RECOVERY_KEY_2026}")
    private String recoveryKey;

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
                    .body(Map.of("error", "Admin initialization is already completed. Please log in."));
        }

        String mobileNumber = request.get("mobileNumber");
        String password = request.get("password");
        String recoveryPin = request.get("recoveryPin");

        if (mobileNumber == null || !mobileNumber.trim().equals(authorizedMobile)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Only the authorized mobile number (" + authorizedMobile + ") can initialize the admin account."));
        }

        if (password == null || password.trim().length() < 8) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Password must be at least 8 characters long."));
        }

        AdminUser admin = new AdminUser(authorizedMobile, passwordEncoder.encode(password.trim()));
        if (recoveryPin != null && !recoveryPin.trim().isEmpty()) {
            admin.setRecoveryPinHash(passwordEncoder.encode(recoveryPin.trim()));
        }
        admin.setLastLoginAt(LocalDateTime.now());
        adminUserRepository.save(admin);

        String token = jwtService.generateToken(authorizedMobile);
        Map<String, Object> resp = new HashMap<>();
        resp.put("token", token);
        resp.put("mobileNumber", authorizedMobile);
        resp.put("message", "Admin account initialized successfully.");
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request, HttpServletRequest servletRequest) {
        String clientIp = servletRequest.getRemoteAddr();

        if (rateLimiterService.isRateLimited(clientIp)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Too many failed login attempts. Please wait 15 minutes before trying again."));
        }

        String mobileNumber = request.get("mobileNumber");
        String password = request.get("password");

        if (mobileNumber == null || !mobileNumber.trim().equals(authorizedMobile)) {
            rateLimiterService.recordFailedAttempt(clientIp);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Unauthorized mobile number or invalid credentials."));
        }

        Optional<AdminUser> adminOpt = adminUserRepository.findByMobileNumber(authorizedMobile);
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.PRECONDITION_REQUIRED)
                    .body(Map.of("error", "Admin account not initialized yet. Please complete initial setup.", "needsSetup", true));
        }

        AdminUser admin = adminOpt.get();

        if (admin.isLocked()) {
            return ResponseEntity.status(HttpStatus.LOCKED)
                    .body(Map.of("error", "Account is temporarily locked due to repeated failed attempts. Please try again after " + admin.getLockoutUntil()));
        }

        if (!passwordEncoder.matches(password != null ? password : "", admin.getPasswordHash())) {
            rateLimiterService.recordFailedAttempt(clientIp);
            int failed = admin.getFailedLoginAttempts() + 1;
            admin.setFailedLoginAttempts(failed);

            if (failed >= maxFailedAttempts) {
                admin.setLockoutUntil(LocalDateTime.now().plusMinutes(lockoutMinutes));
                adminUserRepository.save(admin);
                return ResponseEntity.status(HttpStatus.LOCKED)
                        .body(Map.of("error", "Too many failed attempts. Account has been locked for " + lockoutMinutes + " minutes."));
            }

            adminUserRepository.save(admin);
            int remaining = maxFailedAttempts - failed;
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid password. " + remaining + " attempt(s) remaining before temporary lockout."));
        }

        // Login success: reset trackers
        rateLimiterService.resetAttempts(clientIp);
        admin.setFailedLoginAttempts(0);
        admin.setLockoutUntil(null);
        admin.setLastLoginAt(LocalDateTime.now());
        adminUserRepository.save(admin);

        String token = jwtService.generateToken(authorizedMobile);
        Map<String, Object> resp = new HashMap<>();
        resp.put("token", token);
        resp.put("mobileNumber", authorizedMobile);
        resp.put("lastLoginAt", admin.getLastLoginAt());
        resp.put("message", "Login successful");
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/auth/recover")
    public ResponseEntity<?> recoverPassword(@RequestBody Map<String, String> request) {
        String mobileNumber = request.get("mobileNumber");
        String secretOrPin = request.get("recoveryKey");
        String newPassword = request.get("newPassword");

        if (mobileNumber == null || !mobileNumber.trim().equals(authorizedMobile)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized mobile number"));
        }

        if (newPassword == null || newPassword.trim().length() < 8) {
            return ResponseEntity.badRequest().body(Map.of("error", "New password must be at least 8 characters long"));
        }

        Optional<AdminUser> adminOpt = adminUserRepository.findByMobileNumber(authorizedMobile);
        if (adminOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Admin account not found"));
        }

        AdminUser admin = adminOpt.get();
        boolean pinValid = admin.getRecoveryPinHash() != null && passwordEncoder.matches(secretOrPin, admin.getRecoveryPinHash());
        boolean masterKeyValid = recoveryKey.equals(secretOrPin);

        if (!pinValid && !masterKeyValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid recovery key or PIN"));
        }

        admin.setPasswordHash(passwordEncoder.encode(newPassword.trim()));
        admin.setFailedLoginAttempts(0);
        admin.setLockoutUntil(null);
        adminUserRepository.save(admin);

        String token = jwtService.generateToken(authorizedMobile);
        return ResponseEntity.ok(Map.of("message", "Password recovered successfully", "token", token));
    }

    @GetMapping("/admin/auth/me")
    public ResponseEntity<?> getAdminProfile(@AuthenticationPrincipal AdminUser admin) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("id", admin.getId());
        resp.put("mobileNumber", admin.getMobileNumber());
        resp.put("lastLoginAt", admin.getLastLoginAt());
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

    @PostMapping("/admin/auth/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}

