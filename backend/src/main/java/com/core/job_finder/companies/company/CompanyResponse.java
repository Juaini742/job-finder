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
}
