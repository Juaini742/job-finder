package com.core.job_finder.auth;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthRequestDTO {

    @NotBlank(message = "full name is required", groups = {onRegister.class})
    private String fullName;

    @NotBlank(message = "phone is required", groups = {onRegister.class})
    private String phone;

    @Email(message = "Invalid Email Format", groups = {onRegister.class, onLogin.class})
    @NotBlank(message = "Email is required", groups = {onRegister.class, onLogin.class})
    private String email;

    @NotBlank(message = "Password is required", groups = {onRegister.class, onLogin.class})
    @Size(min = 6, message = "Password must be at least 6 characters", groups = {onRegister.class, onLogin.class})
    private String password;

    @NotBlank(message = "Role is required", groups = {onRegister.class})
    private String role;
}
