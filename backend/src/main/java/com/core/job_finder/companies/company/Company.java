package com.core.job_finder.companies.company;


import com.core.job_finder.base_enrity.BaseEntity;
import com.core.job_finder.companies.social_media_company.SocialMediaCompany;
import com.core.job_finder.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "companies")
public class Company extends BaseEntity {
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;
    private String industry;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "founded_in")
    private Timestamp foundedIn;

    @Enumerated(EnumType.STRING)
    private Organization_Type organizationType;

    @Column(name = "team_size")
    private Long teamSize;

    @Column(name = "website_url")
    private String webUrl;

    private String phone;

    private String email;

    @OneToOne(mappedBy = "company")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<SocialMediaCompany> socialMediaCompanies;

    enum Organization_Type {
        PRIVATE,
        PUBLIC,
        GOVERNMENT
    }


}
