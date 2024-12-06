package com.core.job_finder.user;

public record UserResponse<T>(String id, String fullName, String email, String role, T company, T application) {
}
