package com.core.job_finder.config;


import com.core.job_finder.companies.company.Company;
import com.core.job_finder.companies.company.CompanyRepository;
import com.core.job_finder.cv.Cv;
import com.core.job_finder.cv.CvRepository;
import com.core.job_finder.cv.CvRequestDTO;
import com.core.job_finder.jobs.job.Job;
import com.core.job_finder.jobs.job.JobRepository;
import com.core.job_finder.jobs.job.JobRequestDTO;
import com.core.job_finder.jobs.job_benefits.JobBenefit;
import com.core.job_finder.jobs.job_benefits.JobBenefitRepository;
import com.core.job_finder.jobs.tag.Tag;
import com.core.job_finder.jobs.tag.TagRepository;
import com.core.job_finder.social_media.SocialMedia;
import com.core.job_finder.social_media.SocialMediaRepository;
import com.core.job_finder.user.User;
import com.core.job_finder.user.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.File;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Configuration
public class TableSeeding {

    private final TagRepository tagRepository;
    private final JobBenefitRepository jobBenefitRepository;
    private final SocialMediaRepository socialMediaRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final CvRepository cvRepository;

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
            // JOB BENEFITS
            List<String> jobBenefits = List.of(
                    "Pay in Crypto",
                    "Health Insurance",
                    "Paid Time Off",
                    "Work from Home",
                    "Retirement Plan",
                    "Stock Options",
                    "Flexible Hours",
                    "Life Insurance",
                    "Bonuses",
                    "Paid Sick Leave",
                    "Professional Development",
                    "Gym Membership",
                    "Commuter Benefits",
                    "Parental Leave",
                    "Employee Assistance Program",
                    "Education Reimbursement",
                    "Employee Discounts",
                    "Team Building Activities",
                    "Health Insurance",
                    "Remote Work",
                    "Learning Budget"
            );

            if (jobBenefitRepository.findAll().isEmpty()) {
                jobBenefits.forEach(benefit -> {
                    if (jobBenefitRepository.findByName(benefit).isEmpty()) {
                        JobBenefit jobBenefitDB = new JobBenefit(benefit);
                        jobBenefitRepository.save(jobBenefitDB);
                    }
                });
                System.out.println("Job benefits have been seeded.");
            } else {
                System.out.println("Job benefits already exist in the database.");
            }

            // TAG
            List<Tag> tags = List.of(
                    new Tag("Remote Work"),
                    new Tag("Full-time"),
                    new Tag("Part-time"),
                    new Tag("Freelance"),
                    new Tag("Startup"),
                    new Tag("Corporate"),
                    new Tag("Tech"),
                    new Tag("Finance"),
                    new Tag("Healthcare"),
                    new Tag("Education"),
                    new Tag("Marketing"),
                    new Tag("Sales"),
                    new Tag("Engineering"),
                    new Tag("Product Management"),
                    new Tag("Design"),
                    new Tag("Customer Support"),
                    new Tag("Data Science"),
                    new Tag("AI & Machine Learning"),
                    new Tag("Cybersecurity"),
                    new Tag("DevOps"),
                    new Tag("Human Resources"),
                    new Tag("Accounting"),
                    new Tag("Legal"),
                    new Tag("Supply Chain"),
                    new Tag("Operations"),
                    new Tag("Blockchain"),
                    new Tag("Mobile Development"),
                    new Tag("SEO"),
                    new Tag("E-commerce"),
                    new Tag("Learning Budget")
            );

            if (tagRepository.findAll().isEmpty()) {
                tags.forEach(tag -> {
                    if (tagRepository.findByName(tag.getName()).isEmpty()) {
                        tagRepository.save(tag);
                    }
                });
                System.out.println("Tags have been seeded.");
            } else {
                System.out.println("Tags already exist in the database.");
            }

            // SOCIAL MEDIA
            List<String> socialMediaPlatforms = List.of(
                    "Facebook",
                    "Twitter",
                    "LinkedIn",
                    "Instagram",
                    "YouTube",
                    "TikTok"
            );

            if (socialMediaRepository.findAll().isEmpty()) {
                socialMediaPlatforms.forEach(platform -> {
                    if (socialMediaRepository.findByName(platform).isEmpty()) {
                        SocialMedia socialMediaDB = new SocialMedia(platform);
                        socialMediaRepository.save(socialMediaDB);
                    }
                });
                System.out.println("Social media platforms have been seeded.");
            } else {
                System.out.println("Social media platforms already exist in the database.");
            }

            if (userRepository.findAll().isEmpty()) {
                // USER
                User user = User.builder()
                        .fullName("dody")
                        .phone("09801980923")
                        .email("dody@gmail.com")
                        .password(passwordEncoder.encode("123123"))
                        .role(User.Role_User.fromString("RECRUITER"))
                        .build();

                userRepository.save(user);
                System.out.println("User has been seeded.");

                Company company = Company.builder()
                        .name("Best Company")
                        .description("We are a leading company in our industry.")
                        .location("Indonesia")
                        .industry("Technology")
                        .logoUrl("https://example.com/logo.png")
                        .foundedIn("2010-05-15")
                        .organizationType(Company.OrganizationType.fromString("PUBLIC"))
                        .teamSize(30L)
                        .websiteUrl("https://www.bestcompany.com")
                        .phone("23492837209")
                        .email("bestcompany@gmail.com")
                        .user(user)
                        .build();

                companyRepository.save(company);
                user.setCompany(company);
                userRepository.save(user);
                System.out.println("Company has been seeded.");
                try {
                    File file = new File("src/main/java/com/core/job_finder/data/data.json");
                    ObjectMapper objectMapper = new ObjectMapper();
                    List<JobRequestDTO> jobs = objectMapper.readValue(file, new TypeReference<List<JobRequestDTO>>() {
                    });
                    jobs.forEach(data -> {
                        Job job = Job.builder()
                                .title(data.getTitle())
                                .description(data.getDescription())
                                .desirable(data.getDesirable())
                                .country(data.getCountry())
                                .city(data.getCity())
                                .minSalary(data.getMinSalary())
                                .maxSalary(data.getMaxSalary())
                                .jobType(Job.Job_Type.fromString(data.getJobType()))
                                .level(Job.Job_Level.fromString(data.getJobLevel()))
                                .jobRole(data.getJobRole())
                                .education(data.getEducation())
                                .sharedAt(data.getSharedAt())
                                .expiredAt(data.getExpiredAt())
                                .salaryType(Job.Salary_Type.fromString(data.getSalaryType()))
                                .vacancies(data.getVacancies())
                                .experience(data.getExperience())
                                .company(user.getCompany())
                                .recruiter(user)
                                .build();

                        List<Tag> tagsX = data.getTags().stream()
                                .map(tag -> tagRepository.findByName(tag)
                                        .orElseGet(() -> {
                                            Tag newTag = Tag.builder().name(tag).build();
                                            return tagRepository.save(newTag);
                                        })).toList();
                        job.setTags(tagsX);

                        List<JobBenefit> jbs = data.getJobBenefits().stream()
                                .map(jb -> jobBenefitRepository.findByName(jb)
                                        .orElseGet(() -> {
                                            JobBenefit jbe = JobBenefit.builder().name(jb).build();
                                            return jobBenefitRepository.save(jbe);
                                        })).toList();
                        job.setJobBenefits(jbs);

                        jobRepository.save(job);
                    });
                } catch (RuntimeException e) {
                    throw new RuntimeException(e);
                }

                User userJOB_SEEKER = User.builder()
                        .fullName("Andi")
                        .phone("092340298")
                        .email("andi@gmail.com")
                        .password(passwordEncoder.encode("123123"))
                        .role(User.Role_User.fromString("JOB_SEEKER"))
                        .build();

                userRepository.save(userJOB_SEEKER);

                Cv currentCv = Cv.builder()
                        .user(userJOB_SEEKER)
                        .build();
                cvRepository.save(currentCv);


            } else {
                System.out.println("User, Company, Cv, and Job data already exist. Skipping seeding.");
            }

            Optional<User> jobSeeker = userRepository.findByEmail("andi@gmail.com");

            if (jobSeeker.isPresent()) {
                User userJobSeeker = jobSeeker.get();

                Cv cv = cvRepository.findByUserId(userJobSeeker.getId())
                        .orElseThrow(() -> new RuntimeException("Cv not found"));

                if (cv.getFullName() == null) {
                    try {
                        File cvFile = new File("src/main/java/com/core/job_finder/data/cv.json");
                        ObjectMapper objectMapper = new ObjectMapper();
                        CvRequestDTO cvRequestDTO = objectMapper.readValue(cvFile, CvRequestDTO.class);

                        cv.setFullName(cvRequestDTO.getFullName());
                        cv.setBirthDay(cvRequestDTO.getBirthDay());
                        cv.setNationality(cvRequestDTO.getNationality());
                        cv.setMaritalStatus(Cv.MaritalStatus.fromString(cvRequestDTO.getMaritalStatus()));
                        cv.setGender(Cv.Gender.fromString(cvRequestDTO.getGender()));
                        cv.setAddress(cvRequestDTO.getAddress());
                        cv.setSummary(cvRequestDTO.getSummary());
                        cv.setCoverLetter(cvRequestDTO.getCoverLetter());
                        cv.setProfilePictureUrl(cvRequestDTO.getProfilePictureUrl());
                        cv.setResumeUrl(cvRequestDTO.getResumeUrl());
                        cv.setWebsiteUrl(cvRequestDTO.getWebsiteUrl());
                        cv.setCertifications(cvRequestDTO.getCertifications());
                        cv.setSkills(cvRequestDTO.getSkills());
                        cv.setExperience(cvRequestDTO.getExperience());
                        cv.setEducation(cvRequestDTO.getEducation());
                        cv.setLanguages(cvRequestDTO.getLanguages());

                        cvRepository.save(cv);
                    } catch (RuntimeException e) {
                        throw new RuntimeException(e);
                    }
                } else {
                    System.out.println("Cv already seed");
                }
            }

        };
    }
}
