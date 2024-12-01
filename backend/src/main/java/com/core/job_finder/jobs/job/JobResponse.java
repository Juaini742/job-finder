package com.core.job_finder.jobs.job;

import java.sql.Timestamp;
import java.util.List;

public record JobResponse(
        String id,
        String title,
        String description,
        String desirable,
        String country,
        String city,
        Long minSalary,
        Long maxSalary,
        String salaryType,
        String experience,
        String jobType,
        String jobRole,
        String level,
        String education,
        Timestamp sharedAt,
        Timestamp expiredAt,
        Integer vacancies,
        List<String> tags,
        List<String> jobBenefits
) {
}
