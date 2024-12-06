package com.core.job_finder.cv;


import jakarta.validation.constraints.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CvRequestDTO {

    @NotBlank(message = "Full name is required.")
    @Size(max = 255, message = "Full name cannot exceed 255 characters.")
    private String fullName;

    @NotNull(message = "Birth day is required.")
    private Timestamp birthDay;

    @NotBlank(message = "Nationality is required.")
    @Size(max = 255, message = "Nationality cannot exceed 255 characters.")
    private String nationality;

    @NotNull(message = "Marital status is required.")
    private String maritalStatus;

    @NotNull(message = "Gender is required.")
    private String gender;

    @NotBlank(message = "Address is required.")
    @Size(max = 1000, message = "Address cannot exceed 1000 characters.")
    private String address;

    @NotBlank(message = "Summary is required.")
    @Size(max = 2000, message = "Summary cannot exceed 2000 characters.")
    private String summary;

    @NotBlank(message = "Cover letter is required.")
    @Size(max = 5000, message = "Cover letter cannot exceed 5000 characters.")
    private String coverLetter;

    @Size(max = 255, message = "Profile picture URL cannot exceed 255 characters.")
    private String profilePictureUrl;

    @Size(max = 2000, message = "Resume URL cannot exceed 2000 characters.")
    private String resumeUrl;

    @Size(max = 2000, message = "Website URL cannot exceed 2000 characters.")
    private String websiteUrl;

    private List<Map<String, Object>> skills;

    private List<Map<String, Object>> experience;

    private List<Map<String, Object>> education;

    private List<Map<String, Object>> certifications;

    private List<Map<String, Object>> languages;
}
