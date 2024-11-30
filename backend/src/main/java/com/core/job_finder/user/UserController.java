package com.core.job_finder.user;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/user")
public class UserController {

    @GetMapping
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("OK");
    }
}
