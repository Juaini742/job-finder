package com.core.job_finder.cv;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CvRepository extends JpaRepository<Cv, String> {
    boolean existsCvByUserId(String id);

    Optional<Cv> findByUserId(String id);
}
