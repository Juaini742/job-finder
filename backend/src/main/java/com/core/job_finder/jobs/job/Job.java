package com.core.job_finder.jobs.job;

import com.core.job_finder.base_enrity.BaseEntity;
import com.core.job_finder.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "jobs")
public class Job extends BaseEntity {

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String jobRequirement;

    @Column(columnDefinition = "TEXT")
    private String desirable;
    private String location;
    private String salary;
    private Long experience;

    @Enumerated(EnumType.STRING)
    private Job_Type type;

    @Enumerated(EnumType.STRING)
    private Job_Level level;

    private String education;

    @Column(name = "shared_at")
    private String sharedAt;

    @ManyToOne
    @JoinColumn(name = "recruiter_id", referencedColumnName = "id")
    private User user;

    enum Job_Type {
        FULL_TIME,
        PART_TIME,
        INTERNSHIP,
        CONTRACT,
        FREELANCE
    }

    enum Job_Level {
        JUNIOR,
        MID,
        SENIOR,
        LEAD
    }
}
