package com.core.job_finder.companies.company;


import com.core.job_finder.base_enrity.BaseEntity;
import com.core.job_finder.jobs.job.Job;
import com.core.job_finder.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "companies")
public class Company extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "location")
    private String location;

    @Column(name = "industry")
    private String industry;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "founded_in", nullable = false)
    private Date foundedIn;

    @Enumerated(EnumType.STRING)
    @Column(name = "organization_type", nullable = false)
    private OrganizationType organizationType;

    @Column(name = "team_size", nullable = false)
    private Long teamSize;

    @Column(name = "website_url")
    private String websiteUrl;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email", nullable = false)
    private String email;

    @OneToOne(mappedBy = "company")
    @JsonIgnore
    private User user;

//    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private List<SocialMediaCompany> socialMediaCompanies;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Job> jobs;

    // Enum for OrganizationType
    public enum OrganizationType {
        PRIVATE,
        PUBLIC,
        GOVERNMENT,
        NGO;

        public static OrganizationType fromString(String value) {
            for (OrganizationType type : OrganizationType.values()) {
                if (type.name().equalsIgnoreCase(value)) {
                    return type;
                }
            }
            throw new IllegalArgumentException("Invalid organization type: " + value);
        }
    }

}
