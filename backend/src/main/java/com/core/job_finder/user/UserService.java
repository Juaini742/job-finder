package com.core.job_finder.user;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public User getUser() {
        return null;
    }
}
