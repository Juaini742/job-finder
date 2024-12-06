package com.core.job_finder.user;


import com.core.job_finder.application.ApplicationService;
import com.core.job_finder.auth.AuthService;
import com.core.job_finder.companies.company.CompanyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final AuthService authService;
    private final ApplicationService applicationService;

    public UserResponse<?> getUser() {
        User user = authService.getCurrentUser();
        CompanyResponse company = null;

        if (user.getCompany() != null) {
            company = CompanyResponse.toCompanyResponse(user.getCompany());
        }
        return new UserResponse<>(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                company,
                user.getApplication().stream().map(applicationService::toApplicationDTOResponse).toList()
        );
    }

}
