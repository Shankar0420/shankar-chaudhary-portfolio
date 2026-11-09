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

    /**
     * Normalizes a mobile number string by removing spaces, dashes, quotes, and international +91 prefix.
     */
    public static String normalizeMobile(String mobile) {
        if (mobile == null) {
            return null;
        }
        String cleaned = mobile.trim();
        // Remove surrounding quotes if present
        if ((cleaned.startsWith("\"") && cleaned.endsWith("\"")) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
            if (cleaned.length() >= 2) {
                cleaned = cleaned.substring(1, cleaned.length() - 1).trim();
            }
        }
        // Extract digits only
        String digits = cleaned.replaceAll("[^0-9]", "");
        // If 12 digits starting with 91 (e.g. 919905340058), strip country code
        if (digits.length() == 12 && digits.startsWith("91")) {
            digits = digits.substring(2);
        }
        return digits.isEmpty() ? cleaned : digits;
    }

    /**
     * Masks a mobile number for safe diagnostic logging (e.g. 9905340058 -> ******0058).
     */
    public static String maskMobile(String mobile) {
        if (mobile == null || mobile.isBlank()) {
            return "[null]";
        }
        String clean = normalizeMobile(mobile);
        if (clean.length() <= 4) {
            return "****";
        }
        return "*".repeat(clean.length() - 4) + clean.substring(clean.length() - 4);
    }

    /**
     * Strips surrounding quotes and trims an environment variable value.
     */
    public static String cleanEnvValue(String val) {
        if (val == null) {
            return null;
        }
        String trimmed = val.trim();
        if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
            if (trimmed.length() >= 2) {
                trimmed = trimmed.substring(1, trimmed.length() - 1).trim();
            }
        }
        return trimmed;
    }
}

