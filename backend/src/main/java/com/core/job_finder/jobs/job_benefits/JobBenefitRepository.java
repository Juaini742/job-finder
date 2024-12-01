package com.core.job_finder.jobs.job_benefits;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface JobBenefitRepository  extends JpaRepository<JobBenefit, String> {
    Optional<JobBenefit> findByName(String benefit);
}
