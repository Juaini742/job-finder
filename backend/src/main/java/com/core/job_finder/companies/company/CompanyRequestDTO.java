package com.core.job_finder.companies.company;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    private String location;

    private String industry;

    @Pattern(regexp = "^(https?|ftp)://[^\\s/$.?#].[^\\s]*$", message = "Logo URL must be a valid URL")
    private String logoUrl;

    @NotNull(message = "Founded date is required")
    private String foundedIn;

    @NotNull(message = "Organization type is required")
    @Pattern(
            regexp = "PRIVATE|PUBLIC|GOVERNMENT|NGO",
            message = "Organization type must be one of PRIVATE, PUBLIC, GOVERNMENT, or NGO"
    )
    private String organizationType;

    @PositiveOrZero(message = "Team size must be a non-negative number")
    private Integer teamSize;

    @Pattern(regexp = "^(https?|ftp)://[^\\s/$.?#].[^\\s]*$", message = "Website URL must be a valid URL")
    private String websiteUrl;

    @Pattern(regexp = "^\\+?[0-9\\s-]+$", message = "Phone number must be valid")
    private String phone;

    @Email(message = "Email must be a valid email address")
    private String email;

    List<Map<String, String>> socialMedia;
}
