package com.shankarchaudhary.portfolio.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterService {

    @Value("${portfolio.admin.max-failed-attempts:5}")
    private int maxFailedAttempts;

    @Value("${portfolio.admin.lockout-minutes:15}")
    private int lockoutMinutes;

    private static class AttemptTracker {
        int attempts;
        LocalDateTime lastAttempt;

        AttemptTracker() {
            this.attempts = 1;
            this.lastAttempt = LocalDateTime.now();
        }
    }

    private final Map<String, AttemptTracker> ipAttempts = new ConcurrentHashMap<>();

    public boolean isRateLimited(String clientIp) {
        AttemptTracker tracker = ipAttempts.get(clientIp);
        if (tracker == null) {
            return false;
        }

        // Reset if window has elapsed
        if (tracker.lastAttempt.plusMinutes(lockoutMinutes).isBefore(LocalDateTime.now())) {
            ipAttempts.remove(clientIp);
            return false;
        }

        return tracker.attempts >= maxFailedAttempts;
    }

    public void recordFailedAttempt(String clientIp) {
        ipAttempts.compute(clientIp, (key, existing) -> {
            if (existing == null || existing.lastAttempt.plusMinutes(lockoutMinutes).isBefore(LocalDateTime.now())) {
                return new AttemptTracker();
            }
            existing.attempts++;
            existing.lastAttempt = LocalDateTime.now();
            return existing;
        });
    }

    public void resetAttempts(String clientIp) {
        ipAttempts.remove(clientIp);
    }

    public int getRemainingAttempts(String clientIp) {
        AttemptTracker tracker = ipAttempts.get(clientIp);
        if (tracker == null) return maxFailedAttempts;
        if (tracker.lastAttempt.plusMinutes(lockoutMinutes).isBefore(LocalDateTime.now())) {
            ipAttempts.remove(clientIp);
            return maxFailedAttempts;
        }
        return Math.max(0, maxFailedAttempts - tracker.attempts);
    }
}

