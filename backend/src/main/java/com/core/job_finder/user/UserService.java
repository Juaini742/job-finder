package com.core.job_finder.user;


import com.core.job_finder.auth.AuthService;
import com.core.job_finder.companies.company.CompanyResponse;
import com.core.job_finder.companies.company.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;
    private final CompanyService companyService;

    public UserResponse<?> getUser() {
        User user = authService.getCurrentUser();
        CompanyResponse company = null;

        if (user.getCompany() != null) {
            company = companyService.toCompanyResponse(user.getCompany());
        }
        return new UserResponse<>(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                company
        );
    }

}
