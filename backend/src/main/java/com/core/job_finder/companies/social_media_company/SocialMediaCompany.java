package com.core.job_finder.companies.social_media_company;


import com.core.job_finder.base_enrity.BaseEntity;
import com.core.job_finder.companies.company.Company;
import com.core.job_finder.social_media.SocialMedia;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "company_social_media")
public class SocialMediaCompany extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    @JsonBackReference
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "social_media_platform_id", referencedColumnName = "id")
    @JsonBackReference
    private SocialMedia socialMedia;

    private String url;


}
