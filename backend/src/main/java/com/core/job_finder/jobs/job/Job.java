package com.core.job_finder.jobs.job;

import com.core.job_finder.application.Application;
import com.core.job_finder.base_enrity.BaseEntity;
import com.core.job_finder.companies.company.Company;
import com.core.job_finder.jobs.job_benefits.JobBenefit;
import com.core.job_finder.jobs.tag.Tag;
import com.core.job_finder.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "jobs")
public class Job extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(columnDefinition = "TEXT")
    private String desirable;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String city;

    @Column(name = "min_salary")
    private Long minSalary;

    @Column(name = "max_salary")
    private Long maxSalary;

    @Column(name = "experience")
    private String experience;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Job_Type jobType;

    @Column(nullable = false, name = "job_role")
    private String jobRole;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Job_Level level;

    @Column(nullable = false)
    private String education;

    @Column(name = "shared_at")
    private Timestamp sharedAt;

    @Column(name = "expired_at", nullable = false)
    private Timestamp expiredAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "salary_type", nullable = false)
    private Salary_Type salaryType;

    @Column(nullable = false)
    private Integer vacancies;

    @ManyToMany
    @JoinTable(
            name = "job_tags",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    @ManyToMany
    @JoinTable(
            name = "job_benefit_mappings",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "job_benefit_id")
    )
    private List<JobBenefit> jobBenefits;

    @ManyToOne
    @JoinColumn(name = "recruiter_id", referencedColumnName = "id", nullable = false)
    private User recruiter;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
    private Company company;

    @OneToMany(mappedBy = "job")
    @JsonBackReference
    private List<Application> applications;

    public enum Job_Type {
        FULL_TIME,
        PART_TIME,
        REMOTE,
        FREELANCE;

        public static Job_Type fromString(String value) {
            for (Job_Type type : Job_Type.values()) {
                if (type.name().equalsIgnoreCase(value)) {
                    return type;
                }
            }
            throw new IllegalArgumentException("Invalid Job_Type value: " + value);
        }
    }

    public enum Job_Level {
        JUNIOR,
        MID,
        SENIOR,
        LEAD;

        public static Job_Level fromString(String value) {
            for (Job_Level level : Job_Level.values()) {
                if (level.name().equalsIgnoreCase(value)) {
                    return level;
                }
            }
            throw new IllegalArgumentException("Invalid Job_Level value: " + value);
        }
    }

    public enum Salary_Type {
        HOURLY,
        MONTHLY,
        YEARLY;

        public static Salary_Type fromString(String value) {
            for (Salary_Type type : Salary_Type.values()) {
                if (type.name().equalsIgnoreCase(value)) {
                    return type;
                }
            }
            throw new IllegalArgumentException("Invalid Salary_Type value: " + value);
        }
    }

}
