package com.core.job_finder.companies.company;

import com.core.job_finder.auth.AuthService;
import com.core.job_finder.companies.social_media_company.SocialMediaCompany;
import com.core.job_finder.companies.social_media_company.SocialMediaCompanyRepository;
import com.core.job_finder.companies.social_media_company.SocialMediaCompanyResponse;
import com.core.job_finder.social_media.SocialMedia;
import com.core.job_finder.social_media.SocialMediaRepository;
import com.core.job_finder.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final AuthService authService;
    private final SocialMediaRepository socialMediaRepository;
    private final SocialMediaCompanyRepository socialMediaCompanyRepository;

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
                .foundedIn(companyRequestDTO.getFoundedIn())
                .organizationType(Company.OrganizationType.fromString(companyRequestDTO.getOrganizationType()))
                .teamSize(Long.valueOf(companyRequestDTO.getTeamSize()))
                .websiteUrl(companyRequestDTO.getWebsiteUrl())
                .phone(companyRequestDTO.getPhone())
                .email(companyRequestDTO.getEmail())
                .user(user)
                .build();

        user.setCompany(company);
        companyRepository.save(company);

        return saveCompanySocialMedia(companyRequestDTO, company);
    }

    public CompanyResponse updateCompany(CompanyRequestDTO companyRequestDTO) {
        User user = authService.getCurrentUser();

        Company company = companyRepository.findById(user.getCompany().getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        company.setName(companyRequestDTO.getName());
        company.setDescription(companyRequestDTO.getDescription());
        company.setLocation(companyRequestDTO.getLocation());
        company.setLogoUrl(companyRequestDTO.getLogoUrl());
        company.setFoundedIn(companyRequestDTO.getFoundedIn());
        company.setOrganizationType(Company.OrganizationType.fromString(companyRequestDTO.getOrganizationType()));
        company.setTeamSize(Long.valueOf(companyRequestDTO.getTeamSize()));
        company.setWebsiteUrl(companyRequestDTO.getWebsiteUrl());
        company.setPhone(companyRequestDTO.getPhone());
        company.setEmail(companyRequestDTO.getEmail());
        company.setIndustry(companyRequestDTO.getIndustry());

        companyRepository.save(company);

        socialMediaCompanyRepository.deleteByCompany(company);

        return saveCompanySocialMedia(companyRequestDTO, company);
    }

    private CompanyResponse saveCompanySocialMedia(CompanyRequestDTO companyRequestDTO, Company company) {
        for (Map<String, String> socialMedia : companyRequestDTO.getSocialMedia()) {
            String name = socialMedia.get("name");
            String url = socialMedia.get("url");
            SocialMedia socialMediaPlatform = socialMediaRepository.findByName(name)
                    .orElseThrow(() -> new RuntimeException("Social Media Platform Not Found"));
            SocialMediaCompany socialMediaCompany = SocialMediaCompany.builder()
                    .socialMedia(socialMediaPlatform)
                    .company(company)
                    .url(url)
                    .build();
            socialMediaCompanyRepository.save(socialMediaCompany);
        }
        return CompanyResponse.toCompanyResponse(company);
    }

}
