package com.core.job_finder.social_media;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface SocialMediaRepository extends JpaRepository<SocialMedia, String> {
    Optional<SocialMedia> findByName(String id);
}
