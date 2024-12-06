package com.core.job_finder.application;

import com.core.job_finder.companies.company.CompanyResponse;
import com.core.job_finder.cv.CvResponse;
import com.core.job_finder.jobs.job.JobResponse;

import java.sql.Timestamp;

public record AppWithCompanyResponse(
        String id,
        String userId,
        String jobId,
        String status,
        Timestamp createdAt,
        JobResponse job,
        CompanyResponse company,
        CvResponse cv
) {

    public static AppWithCompanyResponse toApplicationWithCompany(Application application) {
        return new AppWithCompanyResponse(
                application.getId(),
                application.getUser().getId(),
                application.getJob().getId(),
                application.getStatus().name(),
                application.getCreatedAt(),
                JobResponse.fromJob(application.getJob()),
                CompanyResponse.toCompanyResponse(application.getJob().getCompany()),
                CvResponse.toCvResponse(application.getCv())

        );
    }
}
