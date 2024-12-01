package com.core.job_finder.companies.company;

import java.util.Date;

public record CompanyResponse(
        String id,
        String name,
        String description,
        String location,
        String industry,
        String logoUrl,
        Date foundedIn,
        Company.OrganizationType organizationType,
        Long teamSize,
        String websiteUrl
) {
}
