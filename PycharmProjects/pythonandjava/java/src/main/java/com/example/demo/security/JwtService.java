package com.example.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    // 1 hour token validity
    private static final long EXPIRATION_TIME = 60 * 60 * 1000;

    // Secret key for signing tokens
    // (kept in-memory for now)
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public JwtService() {
        System.out.println("✅ JwtService bean created");
    }

    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)                 // who the token belongs to
                .setIssuedAt(new Date())              // when it was issued
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION_TIME)
                )
                .signWith(key)                        // sign with secret key
                .compact();
    }

    // We will need these in Step 4 (JWT filter)

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}