package com.core.job_finder.application;

import com.core.job_finder.cv.CvResponse;

import java.sql.Timestamp;

public record ApplicationResponse(
        String id,
        String userId,
        String jobId,
        String status,
        Timestamp createdAt,
        CvResponse cv
) {

    public static ApplicationResponse toApplicationResponse(Application application) {
        return new ApplicationResponse(
                application.getId(),
                application.getUser().getId(),
                application.getJob().getId(),
                application.getStatus().name(),
                application.getCreatedAt(),
                CvResponse.toCvResponse(application.getCv())
        );
    }
}
