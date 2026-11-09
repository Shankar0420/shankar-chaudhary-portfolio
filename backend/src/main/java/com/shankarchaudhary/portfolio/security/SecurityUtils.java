package com.shankarchaudhary.portfolio.security;

import java.security.SecureRandom;

public class SecurityUtils {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final char[] HEX_CHARS = "0123456789ABCDEF".toCharArray();

    /**
     * Generates a 128-bit cryptographically secure recovery key.
     * Format: REC-XXXX-XXXX-XXXX-XXXX (e.g. REC-8F3A-7B9C-4D2E-1F0A)
     */
    public static String generateRecoveryKey() {
        byte[] bytes = new byte[16];
        SECURE_RANDOM.nextBytes(bytes);

        StringBuilder sb = new StringBuilder("REC-");
        for (int i = 0; i < bytes.length; i++) {
            int v = bytes[i] & 0xFF;
            sb.append(HEX_CHARS[v >>> 4]);
            sb.append(HEX_CHARS[v & 0x0F]);
            if ((i + 1) % 4 == 0 && i < bytes.length - 1) {
                sb.append("-");
            }
        }
        return sb.toString();
    }
}

