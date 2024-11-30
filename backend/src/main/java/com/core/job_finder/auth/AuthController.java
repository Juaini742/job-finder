package com.core.job_finder.auth;


import com.core.job_finder.helper.GlobalResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/public/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Validated(onRegister.class) @RequestBody AuthRequestDTO authRequestDTO,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = authService.register(authRequestDTO);
        setToken(response, authResponse);
        return GlobalResponse
                .buildResponse(HttpStatus.CREATED, "User registered successfully", authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Validated(onLogin.class) @RequestBody AuthRequestDTO authRequestDTO,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = authService.login(authRequestDTO);
        setToken(response, authResponse);
        return GlobalResponse
                .buildResponse(HttpStatus.OK, "User registered successfully", authResponse);
    }

    private void setToken(HttpServletResponse response, AuthResponse authResponse) {
        Cookie cookie = new Cookie("access_token", ("Bearer_" + authResponse.token()));
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setDomain("localhost");
        cookie.setMaxAge(60 * 60 * 24 * 7); // 1 week
        response.addCookie(cookie);
    }

}
