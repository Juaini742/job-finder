package com.core.job_finder.config;


import com.core.job_finder.jobs.job_benefits.JobBenefit;
import com.core.job_finder.jobs.job_benefits.JobBenefitRepository;
import com.core.job_finder.jobs.tag.Tag;
import com.core.job_finder.jobs.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class TableSeeding {

    private final TagRepository tagRepository;
    private final JobBenefitRepository jobBenefitRepository;

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
                    "Team Building Activities"
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
                    new Tag("E-commerce")
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
        };
    }
}
