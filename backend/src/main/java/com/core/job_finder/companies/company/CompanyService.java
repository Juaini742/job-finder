package com.core.job_finder.companies.company;


import com.core.job_finder.auth.AuthService;
import com.core.job_finder.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;

@RequiredArgsConstructor
@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final AuthService authService;

    public CompanyResponse createCompany(CompanyRequestDTO companyRequestDTO) {
        User user = authService.getCurrentUser();

        if (!user.getRole().name().equals("RECRUITER")) {
            throw new RuntimeException("Only recruiter can create company");
        }

        Company company = Company.builder()
                .name(companyRequestDTO.getName())
                .description(companyRequestDTO.getDescription())
                .location(companyRequestDTO.getLocation())
                .industry(companyRequestDTO.getIndustry())
                .logoUrl(companyRequestDTO.getLogoUrl())
                .foundedIn(Date.valueOf(companyRequestDTO.getFoundedIn()))
                .organizationType(Company.OrganizationType.fromString(companyRequestDTO.getOrganizationType()))
                .teamSize(Long.valueOf(companyRequestDTO.getTeamSize()))
                .websiteUrl(companyRequestDTO.getWebsiteUrl())
                .phone(companyRequestDTO.getPhone())
                .email(companyRequestDTO.getEmail())
                .user(user)
                .build();

        user.setCompany(company);

        companyRepository.save(company);
        return toCompanyResponse(company);
    }

    public CompanyResponse toCompanyResponse(Company company) {
        return new CompanyResponse(
                company.getId(),
                company.getName(),
                company.getDescription(),
                company.getLocation(),
                company.getIndustry(),
                company.getLogoUrl(),
                company.getFoundedIn(),
                company.getOrganizationType(),
                company.getTeamSize(),
                company.getWebsiteUrl()
        );
    }
}
