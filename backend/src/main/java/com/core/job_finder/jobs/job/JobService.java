package com.core.job_finder.jobs.job;


import com.core.job_finder.auth.AuthService;
import com.core.job_finder.jobs.job_benefits.JobBenefit;
import com.core.job_finder.jobs.job_benefits.JobBenefitRepository;
import com.core.job_finder.jobs.tag.Tag;
import com.core.job_finder.jobs.tag.TagRepository;
import com.core.job_finder.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class JobService {

    private final JobRepository jobRepository;
    private final AuthService authService;
    private final TagRepository tagRepository;
    private final JobBenefitRepository jobBenefitRepository;

    public List<JobResponse> findAllJobByUserId() {
        User user = authService.getCurrentUser();
        List<Job> jobs = jobRepository.findAllByRecruiterId(user.getId());

        if (jobs.isEmpty()) {
//            throw new RuntimeException("You don't have any job");
            return List.of();
        }

        return jobs.stream().map(this::toJobResponse).toList();
    }

    public JobResponse createJob(JobRequestDTO jobRequestDTO) {
        User user = authService.getCurrentUser();

        if (user.getCompany() == null) {
            throw new RuntimeException("Before creating job, you need to create company");
        }

        Job job = Job.builder()
                .title(jobRequestDTO.getTitle())
                .description(jobRequestDTO.getDescription())
                .desirable(jobRequestDTO.getDesirable())
                .country(jobRequestDTO.getCountry())
                .city(jobRequestDTO.getCity())
                .minSalary(jobRequestDTO.getMinSalary())
                .maxSalary(jobRequestDTO.getMaxSalary())
                .jobType(Job.Job_Type.fromString(jobRequestDTO.getJobType()))
                .level(Job.Job_Level.fromString(jobRequestDTO.getJobLevel()))
                .jobRole(jobRequestDTO.getJobRole())
                .education(jobRequestDTO.getEducation())
                .sharedAt(jobRequestDTO.getSharedAt())
                .expiredAt(jobRequestDTO.getExpiredAt())
                .salaryType(Job.Salary_Type.fromString(jobRequestDTO.getSalaryType()))
                .vacancies(jobRequestDTO.getVacancies())
                .experience(jobRequestDTO.getExperience())
                .company(user.getCompany())
                .recruiter(user)
                .build();

        List<Tag> tags = jobRequestDTO.getTags().stream()
                .map(data -> tagRepository.findByName(data)
                        .orElseGet(() -> {
                            Tag newTag = Tag.builder().name(data).build();
                            return tagRepository.save(newTag);
                        })).toList();
        job.setTags(tags);

        List<JobBenefit> jbs = jobRequestDTO.getJobBenefits().stream()
                .map(data -> jobBenefitRepository.findByName(data)
                        .orElseGet(() -> {
                            JobBenefit jb = JobBenefit.builder().name(data).build();
                            return jobBenefitRepository.save(jb);
                        })).toList();
        job.setJobBenefits(jbs);

        jobRepository.save(job);

        return toJobResponse(job);
    }

    public JobResponse toJobResponse(Job job) {
        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getDesirable(),
                job.getCountry(),
                job.getCity(),
                job.getMinSalary(),
                job.getMaxSalary(),
                job.getSalaryType().name(),
                job.getExperience(),
                job.getJobType().name(),
                job.getJobRole(),
                job.getLevel().name(),
                job.getEducation(),
                job.getSharedAt(),
                job.getExpiredAt(),
                job.getVacancies(),
                job.getTags().stream().map(Tag::getName).toList(),
                job.getJobBenefits().stream().map(JobBenefit::getName).toList()
        );
    }


}
