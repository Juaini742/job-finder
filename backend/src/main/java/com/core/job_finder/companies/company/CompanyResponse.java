package com.core.job_finder.companies.company;


import com.core.job_finder.companies.social_media_company.SocialMediaCompanyResponse;

import java.util.List;

public record CompanyResponse(
        String id,
        String name,
        String description,
        String location,
        String industry,
        String logoUrl,
        String foundedIn,
        Company.OrganizationType organizationType,
        Long teamSize,
        String websiteUrl,
        String phone,
        String email,
        List<SocialMediaCompanyResponse> socialMedia
) {

    public static CompanyResponse toCompanyResponse(Company company) {
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
                company.getWebsiteUrl(),
                company.getPhone(),
                company.getEmail(),
                company.getSocialMediaCompanies().stream()
                        .map(socialMediaCompany -> new SocialMediaCompanyResponse(
                                socialMediaCompany.getId(),
                                socialMediaCompany.getSocialMedia().getName(),
                                socialMediaCompany.getUrl()
                        ))
                        .toList()
        );
    }
}
