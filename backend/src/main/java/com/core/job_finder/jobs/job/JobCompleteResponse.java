package com.core.job_finder.jobs.job;

import com.core.job_finder.application.AppWithCompanyResponse;
import com.core.job_finder.jobs.job_benefits.JobBenefit;
import com.core.job_finder.jobs.tag.Tag;

import java.sql.Timestamp;
import java.util.List;

public record JobCompleteResponse(
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
        List<String> jobBenefits,
        List<AppWithCompanyResponse> applications
) {

    public static JobCompleteResponse toJobCompleteResponse(Job job) {
        return new JobCompleteResponse(
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
                job.getVacancies(),
                job.getTags().stream().map(Tag::getName).toList(),
                job.getJobBenefits().stream().map(JobBenefit::getName).toList(),
                job.getApplications().stream().map(AppWithCompanyResponse::toApplicationWithCompany).toList()
        );
    }
}
