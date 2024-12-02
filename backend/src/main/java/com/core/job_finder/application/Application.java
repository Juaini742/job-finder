package com.core.job_finder.application;

import com.core.job_finder.base_enrity.BaseEntity;
import com.core.job_finder.cv.Cv;
import com.core.job_finder.jobs.job.Job;
import com.core.job_finder.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "application")
public class Application extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private Job job;

    @ManyToOne
    @JoinColumn(name = "cv_id", referencedColumnName = "id")
    private Cv cv;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ApplicationStatus status;

    public enum ApplicationStatus {
        PENDING, ACCEPTED, REJECTED, INTERVIEW;

        public static ApplicationStatus fromString(String status) {
            for (ApplicationStatus applicationStatus : ApplicationStatus.values()) {
                if (applicationStatus.name().equalsIgnoreCase(status)) {
                    return applicationStatus;
                }
            }
            throw new IllegalArgumentException("Invalid application status: " + status);
        }
    }
}
