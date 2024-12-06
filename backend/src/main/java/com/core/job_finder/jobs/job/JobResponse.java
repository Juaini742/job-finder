package com.core.job_finder.jobs.job;

import com.core.job_finder.application.ApplicationResponse;

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
        Integer vacancies
) {

    public static JobResponse fromJob(Job job) {
        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getDesirable(),
                job.getCountry(),
                job.getCity(),
                job.getMinSalary(),
                job.getMaxSalary(),
                job.getSalaryType().name(),
                job.getExperience(),
                job.getJobType().name(),
                job.getJobRole(),
                job.getLevel().name(),
                job.getEducation(),
                job.getSharedAt(),
                job.getExpiredAt(),
                job.getVacancies()
        );
    }
}
