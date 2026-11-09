package com.shankarchaudhary.portfolio.security;

import org.junit.jupiter.api.Test;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class SecurityUtilsTest {

    @Test
    void testRecoveryKeyFormat() {
        String key = SecurityUtils.generateRecoveryKey();
        assertNotNull(key);
        assertTrue(key.startsWith("REC-"), "Key must start with prefix REC-");
        // Format: REC-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX (length: 4 + 32 hex + 3 hyphens = 39)
        assertEquals(39, key.length(), "Key length must be 39 chars");
        assertTrue(key.matches("^REC-[0-9A-F]{8}-[0-9A-F]{8}-[0-9A-F]{8}-[0-9A-F]{8}$"),
                "Key must match hex grouped format");
    }

    @Test
    void testRecoveryKeyUniqueness() {
        Set<String> generatedKeys = new HashSet<>();
        for (int i = 0; i < 1000; i++) {
            String key = SecurityUtils.generateRecoveryKey();
            assertFalse(generatedKeys.contains(key), "Generated keys must be cryptographically unique");
            generatedKeys.add(key);
        }
        assertEquals(1000, generatedKeys.size());
    }
}
