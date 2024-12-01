package com.core.job_finder.jobs.job_benefits;


import com.core.job_finder.base_enrity.BaseEntity;
import com.core.job_finder.jobs.job.Job;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "job_benefits")
public class JobBenefit extends BaseEntity {

    public JobBenefit(String name) {
        this.name = name;
    }

    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @ManyToMany(mappedBy = "jobBenefits")
    private List<Job> jobs;
}
