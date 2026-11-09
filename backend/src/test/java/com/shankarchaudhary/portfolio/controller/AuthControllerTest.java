package com.shankarchaudhary.portfolio.controller;

import com.shankarchaudhary.portfolio.entity.AdminUser;
import com.shankarchaudhary.portfolio.repository.AdminUserRepository;
import com.shankarchaudhary.portfolio.security.JwtService;
import com.shankarchaudhary.portfolio.security.RateLimiterService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.*;
import java.util.function.Function;

import static org.junit.jupiter.api.Assertions.*;

class AuthControllerTest {

    private FakeAdminUserRepository fakeRepo;
    private FakeJwtService fakeJwt;
    private RateLimiterService rateLimiterService;
    private PasswordEncoder passwordEncoder;
    private AuthController authController;

    private final String AUTHORIZED_MOBILE = "9905340058";

    @BeforeEach
    void setUp() {
        fakeRepo = new FakeAdminUserRepository();
        fakeJwt = new FakeJwtService();
        rateLimiterService = new RateLimiterService();
        passwordEncoder = new BCryptPasswordEncoder();

        authController = new AuthController(
                fakeRepo,
                passwordEncoder,
                fakeJwt,
                rateLimiterService
        );
        ReflectionTestUtils.setField(authController, "authorizedMobile", AUTHORIZED_MOBILE);
        ReflectionTestUtils.setField(authController, "maxFailedAttempts", 5);
        ReflectionTestUtils.setField(authController, "lockoutMinutes", 15);
    }

    @Test
    void testSetupAdmin_GeneratesAndReturnsRecoveryKey() {
        Map<String, String> request = Map.of(
                "mobileNumber", AUTHORIZED_MOBILE,
                "password", "StrongPassword123"
        );

        ResponseEntity<?> response = authController.setupAdmin(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Map<?, ?> body = (Map<?, ?>) response.getBody();
        assertNotNull(body);
        assertEquals("fake-jwt-token", body.get("token"));
        assertEquals(AUTHORIZED_MOBILE, body.get("mobileNumber"));

        String recoveryKey = (String) body.get("recoveryKey");
        assertNotNull(recoveryKey, "Recovery key must be generated and returned");
        assertTrue(recoveryKey.startsWith("REC-"), "Recovery key must have REC- prefix");

        // Verify stored in DB
        Optional<AdminUser> saved = fakeRepo.findByMobileNumber(AUTHORIZED_MOBILE);
        assertTrue(saved.isPresent());
        assertTrue(passwordEncoder.matches("StrongPassword123", saved.get().getPasswordHash()));
        assertTrue(passwordEncoder.matches(recoveryKey, saved.get().getRecoveryPinHash()));
    }

    @Test
    void testSetupAdmin_RejectsUnauthorizedMobile() {
        Map<String, String> request = Map.of(
                "mobileNumber", "9876543210",
                "password", "StrongPassword123"
        );

        ResponseEntity<?> response = authController.setupAdmin(request);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(0, fakeRepo.count());
    }

    @Test
    void testSetupAdmin_BlocksIfAlreadyInitialized() {
        AdminUser existing = new AdminUser(AUTHORIZED_MOBILE, passwordEncoder.encode("Password123"));
        fakeRepo.save(existing);

        Map<String, String> request = Map.of(
                "mobileNumber", AUTHORIZED_MOBILE,
                "password", "StrongPassword123"
        );

        ResponseEntity<?> response = authController.setupAdmin(request);
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    @Test
    void testRecoverPassword_SuccessWithRecoveryKey_GeneratesNewKey() {
        String oldRecoveryKey = "REC-1111-2222-3333-4444";
        AdminUser existing = new AdminUser(AUTHORIZED_MOBILE, passwordEncoder.encode("OldPassword123"));
        existing.setRecoveryPinHash(passwordEncoder.encode(oldRecoveryKey));
        fakeRepo.save(existing);

        Map<String, String> request = Map.of(
                "mobileNumber", AUTHORIZED_MOBILE,
                "recoveryKey", oldRecoveryKey,
                "newPassword", "NewStrongPassword456"
        );

        ResponseEntity<?> response = authController.recoverPassword(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Map<?, ?> body = (Map<?, ?>) response.getBody();
        assertNotNull(body);

        String newRecoveryKey = (String) body.get("recoveryKey");
        assertNotNull(newRecoveryKey, "New recovery key must be generated");
        assertNotEquals(oldRecoveryKey, newRecoveryKey, "Recovery key must be rotated");

        AdminUser updated = fakeRepo.findByMobileNumber(AUTHORIZED_MOBILE).orElseThrow();
        assertTrue(passwordEncoder.matches("NewStrongPassword456", updated.getPasswordHash()));
        assertTrue(passwordEncoder.matches(newRecoveryKey, updated.getRecoveryPinHash()));
        assertEquals(0, updated.getFailedLoginAttempts());
        assertNull(updated.getLockoutUntil());
    }

    @Test
    void testRecoverPassword_RejectsInvalidKey() {
        AdminUser existing = new AdminUser(AUTHORIZED_MOBILE, passwordEncoder.encode("OldPassword123"));
        existing.setRecoveryPinHash(passwordEncoder.encode("REC-CORRECT-KEY"));
        fakeRepo.save(existing);

        Map<String, String> request = Map.of(
                "mobileNumber", AUTHORIZED_MOBILE,
                "recoveryKey", "REC-WRONG-KEY",
                "newPassword", "NewStrongPassword456"
        );

        ResponseEntity<?> response = authController.recoverPassword(request);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    // --- FAKE IN-MEMORY REPOSITORY FOR SAFE SANDBOX TESTING ---
    static class FakeAdminUserRepository implements AdminUserRepository {
        private final Map<String, AdminUser> db = new HashMap<>();
        private long idSeq = 1;

        @Override
        public Optional<AdminUser> findByMobileNumber(String mobileNumber) {
            return Optional.ofNullable(db.get(mobileNumber));
        }

        @Override
        public long count() {
            return db.size();
        }

        @Override
        public <S extends AdminUser> S save(S entity) {
            if (entity.getId() == null) {
                entity.setId(idSeq++);
            }
            db.put(entity.getMobileNumber(), entity);
            return entity;
        }

        @Override
        public Optional<AdminUser> findById(Long aLong) {
            return db.values().stream().filter(u -> u.getId().equals(aLong)).findFirst();
        }

        @Override public void flush() {}
        @Override public <S extends AdminUser> S saveAndFlush(S entity) { return save(entity); }
        @Override public <S extends AdminUser> List<S> saveAllAndFlush(Iterable<S> entities) { return null; }
        @Override public void deleteAllInBatch(Iterable<AdminUser> entities) {}
        @Override public void deleteAllByIdInBatch(Iterable<Long> longs) {}
        @Override public void deleteAllInBatch() {}
        @Override public AdminUser getOne(Long aLong) { return null; }
        @Override public AdminUser getById(Long aLong) { return null; }
        @Override public AdminUser getReferenceById(Long aLong) { return null; }
        @Override public <S extends AdminUser> Optional<S> findOne(Example<S> example) { return Optional.empty(); }
        @Override public <S extends AdminUser> List<S> findAll(Example<S> example) { return null; }
        @Override public <S extends AdminUser> List<S> findAll(Example<S> example, Sort sort) { return null; }
        @Override public <S extends AdminUser> Page<S> findAll(Example<S> example, Pageable pageable) { return null; }
        @Override public <S extends AdminUser> long count(Example<S> example) { return 0; }
        @Override public <S extends AdminUser> boolean exists(Example<S> example) { return false; }
        @Override public <S extends AdminUser, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) { return null; }
        @Override public <S extends AdminUser> List<S> saveAll(Iterable<S> entities) { return null; }
        @Override public boolean existsById(Long aLong) { return false; }
        @Override public List<AdminUser> findAll() { return new ArrayList<>(db.values()); }
        @Override public List<AdminUser> findAllById(Iterable<Long> longs) { return null; }
        @Override public void deleteById(Long aLong) {}
        @Override public void delete(AdminUser entity) {}
        @Override public void deleteAllById(Iterable<? extends Long> longs) {}
        @Override public void deleteAll(Iterable<? extends AdminUser> entities) {}
        @Override public void deleteAll() {}
        @Override public List<AdminUser> findAll(Sort sort) { return null; }
        @Override public Page<AdminUser> findAll(Pageable pageable) { return null; }
    }

    static class FakeJwtService extends JwtService {
        FakeJwtService() {
            super();
        }

        @Override
        public String generateToken(String mobileNumber) {
            return "fake-jwt-token";
        }
    }
}
