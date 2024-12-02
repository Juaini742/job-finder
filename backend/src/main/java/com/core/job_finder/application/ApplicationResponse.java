package com.core.job_finder.application;

import com.core.job_finder.cv.CvResponse;

public record ApplicationResponse(
        String id,
        String userId,
        String jobId,
        String status,
        CvResponse cv
) {
}
