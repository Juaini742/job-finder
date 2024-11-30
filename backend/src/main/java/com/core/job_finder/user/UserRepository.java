package com.core.job_finder.user;


import com.core.job_finder.auth.onLogin;
import com.core.job_finder.auth.onRegister;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(@Email @NotBlank(message = "Email is required", groups = {onRegister.class, onLogin.class}) String email);

    boolean existsUserByEmail(@Email @NotBlank(message = "Email is required", groups = {onRegister.class, onLogin.class}) String email);
}
