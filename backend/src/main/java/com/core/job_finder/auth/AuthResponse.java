package com.core.job_finder.auth;

import com.core.job_finder.user.User;

public record AuthResponse(String id, String fullName, String email, String role, String token) {

    public static AuthResponse toUserResponse(User user, String token) {
        return new AuthResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                token
        );
    }
}
