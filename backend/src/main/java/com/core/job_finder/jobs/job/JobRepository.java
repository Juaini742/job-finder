package com.core.job_finder.jobs.job;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, String> {
    List<Job> findAllByRecruiterId(String id);

    Optional<Object> findByIdAndRecruiterId(String id, String recruiterId);
}
