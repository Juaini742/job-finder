package com.core.job_finder.auth;

import com.core.job_finder.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    public String extractUserEmail(String token) {
        return extractClams(token, Claims::getSubject);
    }

    public <T> T extractClams(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .subject(String.valueOf(user.getEmail()))
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) // 1 week
                .claim("role", user.getRole().name())
                .issuer("JobFinder")
                .signWith(getSignInKey())
                .compact();
    }

    public boolean isTokenValid(String token, User user) {
        final String userEmail = extractUserEmail(token);
        return (userEmail.equals(user.getEmail())) && !expiredToken(token);
    }

    public String extractTokenFromBearer(String bearerToken) {
        if (bearerToken == null || !bearerToken.startsWith("Bearer_")) {
            return null;
        }
        return bearerToken.substring(7);
    }

    private SecretKey getSignInKey() {
            final String SECRET_KEY = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
        byte[] bytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(bytes);
    }

    private boolean expiredToken(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClams(token, Claims::getExpiration);
    }
}
