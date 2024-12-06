package com.core.job_finder.cv;

import com.core.job_finder.base_enrity.BaseEntity;
import com.core.job_finder.helper.StringJsonCvType;
import com.core.job_finder.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Convert(attributeName = "entityAttrName", converter = StringJsonCvType.class)
@Entity
public class Cv extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "birth_day")
    private Timestamp birthDay;

    @Column(name = "nationality")
    private String nationality;

    @Enumerated(EnumType.STRING)
    @Column(name = "marital_status")
    private MaritalStatus maritalStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "address", columnDefinition = "text")
    private String address;

    @Column(name = "summary", columnDefinition = "text")
    private String summary;

    @Column(name = "cover_letter", columnDefinition = "text")
    private String coverLetter;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "website_url")
    private String websiteUrl;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "skills", columnDefinition = "jsonb")
    private List<Map<String, Object>> skills;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "experience", columnDefinition = "jsonb")
    private List<Map<String, Object>> experience;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "education", columnDefinition = "jsonb")
    private List<Map<String, Object>> education;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "languages", columnDefinition = "jsonb")
    private List<Map<String, Object>> languages;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "certifications", columnDefinition = "jsonb")
    private List<Map<String, Object>> certifications;


    public enum MaritalStatus {
        SINGLE,
        MARRIED,
        DIVORCED,
        WIDOWeED;

        public static MaritalStatus fromString(String value) {
            for (MaritalStatus maritalStatus : MaritalStatus.values()) {
                if (maritalStatus.name().equalsIgnoreCase(value)) {
                    return maritalStatus;
                }
            }
            throw new IllegalArgumentException("Invalid MaritalStatus value: " + value);
        }
    }

    public enum Gender {
        MALE,
        FEMALE,
        PREFER_NOT_TO_SAY;

        public static Gender fromString(String value) {
            for (Gender gender : Gender.values()) {
                if (gender.name().equalsIgnoreCase(value)) {
                    return gender;
                }
            }
            throw new IllegalArgumentException("Invalid Gender value: " + value);
        }
    }
}
