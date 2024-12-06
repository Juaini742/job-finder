package com.core.job_finder.jobs.job;


import jakarta.validation.constraints.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobRequestDTO {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;

    @NotNull(message = "Tags are required")
    @Size(min = 1, message = "At least one tag is required")
    private List<@NotBlank(message = "Tag must not be empty") String> tags;

    @NotNull(message = "Job benefits are required")
    @Size(min = 1, message = "At least one job benefit is required")
    private List<@NotBlank(message = "Job benefit must not be empty") String> jobBenefits;

    @NotBlank(message = "Experience is required")
    @Size(max = 255, message = "Experience must not exceed 255 characters")
    private String experience;

    @NotNull(message = "Job type is required")
    private String jobType;

    @NotNull(message = "Job level is required")
    private String jobLevel;

    @NotBlank(message = "Education is required")
    @Size(max = 255, message = "Education must not exceed 255 characters")
    private String education;

    private Timestamp sharedAt;

    @Future(message = "Expiration date must be in the future")
    private Timestamp expiredAt;

    @Min(value = 0, message = "Minimum salary must be at least 0")
    private Long minSalary;

    @Min(value = 0, message = "Maximum salary must be at least 0")
    private Long maxSalary;

    private String description;

    private String desirable;

    @NotBlank(message = "Country is required")
    @Size(max = 255, message = "Country must not exceed 255 characters")
    private String country;

    @NotBlank(message = "City is required")
    @Size(max = 255, message = "City must not exceed 255 characters")
    private String city;

    @NotBlank(message = "Job role is required")
    @Size(max = 255, message = "Job role must not exceed 255 characters")
    private String jobRole;

    @NotNull(message = "Salary type is required")
    private String salaryType;

    @NotNull(message = "Vacancies are required")
    @Min(value = 1, message = "Vacancies must be at least 1")
    private Integer vacancies;
}
