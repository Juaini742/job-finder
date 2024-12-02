package com.core.job_finder.companies.social_media_company;

import com.core.job_finder.companies.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialMediaCompanyRepository extends JpaRepository<SocialMediaCompany, String> {
    void deleteByCompany(Company company);
}
