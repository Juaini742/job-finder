package com.core.job_finder.auth;

public record AuthResponse(String id,String fullName, String email, String role, String token) {
}
