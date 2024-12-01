package com.core.job_finder.user;


import com.core.job_finder.helper.GlobalResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/user")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> test() {
        UserResponse<?> user = userService.getUser();
        return GlobalResponse.buildResponse(HttpStatus.OK, "User data", user);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            Optional<Cookie> cookie = Arrays.stream(cookies)
                    .filter(data -> data.getName().equals("access_token")).findFirst();

            if (cookie.isPresent()) {
                Cookie token = cookie.get();
                token.setMaxAge(0);
                token.setPath("/");
                token.setHttpOnly(true);
                token.setSecure(true);
                token.setDomain("localhost");
                response.addCookie(token);
                SecurityContextHolder.clearContext();
                return ResponseEntity.ok("Logged out successfully");
            }
        }
        return null;
    }

}
