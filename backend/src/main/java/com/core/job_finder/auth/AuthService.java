package com.core.job_finder.auth;


import com.core.job_finder.companies.company.Company;
import com.core.job_finder.companies.company.CompanyRepository;
import com.core.job_finder.user.User;
import com.core.job_finder.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.SimpleTimeZone;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CompanyRepository companyRepository;

    public AuthResponse register(AuthRequestDTO authRequestDTO) {
        if (userRepository.existsUserByEmail(authRequestDTO.getEmail())) {
            throw new RuntimeException("User already exists");
        }

        Company company = null;
        if (authRequestDTO.getRole().equals("RECRUITER")) {
            company = Company.builder().build();
            companyRepository.save(company);
        }

        User user = User.builder()
                .fullName(authRequestDTO.getFullName())
                .phone(authRequestDTO.getPhone())
                .email(authRequestDTO.getEmail())
                .password(passwordEncoder.encode(authRequestDTO.getPassword()))
                .role(User.Role_User.fromString(authRequestDTO.getRole()))
                .company(company)
                .build();

        userRepository.save(user);


        String token = new JwtService().generateToken(user);
        return new AuthResponse(user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                token
        );
    }

    public AuthResponse login(AuthRequestDTO authRequestDTO) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequestDTO.getEmail(),
                        authRequestDTO.getPassword()
                )
        );

        User user = (User) auth.getPrincipal();
        String token = new JwtService().generateToken(user);
        return new AuthResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                token
        );
    }

    public String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        return null;
    }

    public User getCurrentUser() {
        String email = getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
