package com.shankarchaudhary.portfolio.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${portfolio.security.jwt.secret}")
    private String secretKey;

    @Value("${portfolio.security.jwt.expiration-ms}")
    private long jwtExpiration;

    public String extractMobileNumber(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(String mobileNumber) {
        return generateToken(new HashMap<>(), mobileNumber);
    }

    public String generateToken(Map<String, Object> extraClaims, String mobileNumber) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(mobileNumber)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignInKey())
                .compact();
    }

    public boolean isTokenValid(String token, String mobileNumber) {
        final String extracted = extractMobileNumber(token);
        return (extracted.equals(mobileNumber)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        if (keyBytes.length < 32) {
            keyBytes = Decoders.BASE64URL.decode(secretKey);
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

