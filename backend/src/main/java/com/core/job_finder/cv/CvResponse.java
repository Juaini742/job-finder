package com.core.job_finder.cv;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public record CvResponse(
        String id,
        String fullName,
        Timestamp birthDay,
        String nationality,
        Cv.MaritalStatus maritalStatus,
        Cv.Gender gender,
        String address,
        String summary,
        String coverLetter,
        String profilePictureUrl,
        String resumeUrl,
        String websiteUrl,
        List<Map<String, Object>> skills,
        List<Map<String, Object>> experience,
        List<Map<String, Object>> education,
        List<Map<String, Object>> languages,
        List<Map<String, Object>> certifications
) {

    public static CvResponse toCvResponse(Cv cv) {
        return new CvResponse(
                cv.getId(),
                cv.getFullName(),
                cv.getBirthDay(),
                cv.getNationality(),
                cv.getMaritalStatus(),
                cv.getGender(),
                cv.getAddress(),
                cv.getSummary(),
                cv.getCoverLetter(),
                cv.getProfilePictureUrl(),
                cv.getResumeUrl(),
                cv.getWebsiteUrl(),
                cv.getSkills(),
                cv.getExperience(),
                cv.getEducation(),
                cv.getLanguages(),
                cv.getCertifications()
        );
    }
}
