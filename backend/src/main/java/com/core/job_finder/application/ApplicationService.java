package com.core.job_finder.application;


import com.core.job_finder.auth.AuthService;
import com.core.job_finder.cv.Cv;
import com.core.job_finder.cv.CvRepository;
import com.core.job_finder.jobs.job.Job;
import com.core.job_finder.jobs.job.JobRepository;
import com.core.job_finder.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CvRepository cvRepository;
    private final AuthService authService;
    private final JobRepository jobRepository;

    public List<AppWithCompanyResponse> getApplicationRecruiter() {
        User user = authService.getCurrentUser();

        if(!user.getRole().name().equals("RECRUITER")) {
            throw new RuntimeException("You are not a recruiter");
        }

        List<Application> applications = new ArrayList<>();
        user.getJobs().stream().map(Job::getApplications).forEach(applications::addAll);

        if(applications.isEmpty()) {
            return List.of();
        }

        return applications.stream().map(AppWithCompanyResponse::toApplicationWithCompany).toList();
    }

    public List<AppWithCompanyResponse> getApplicationByUser() {
        User user = authService.getCurrentUser();

        if (user.getRole().name().equals("RECRUITER")) {
            throw new RuntimeException("Recruiters dont have applications");
        }

        List<Application> applications = applicationRepository
                .findByUserId(authService.getCurrentUser().getId());

        if (applications.isEmpty()) {
            return List.of();
        }

        return applications.stream().map(AppWithCompanyResponse::toApplicationWithCompany).toList();
    }

    public ApplicationResponse getApplicationById(String id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        return ApplicationResponse.toApplicationResponse(application);
    }

    public ApplicationRequestDTO createApplication(ApplicationRequestDTO applicationRequestDTO) {
        User user = authService.getCurrentUser();

        if (user.getRole().name().equals("RECRUITER")) {
            throw new RuntimeException("Recruiters cannot apply for jobs");
        }

        Cv cv = cvRepository.findById(applicationRequestDTO.getCvId())
                .orElseThrow(() -> new RuntimeException("CV not found"));

        Job job = jobRepository.findById(applicationRequestDTO.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (applicationRepository.existsByUserIdAndJobId(user.getId(), job.getId())) {
            throw new RuntimeException("Application already exists");
        }

        Application application = Application.builder()
                .user(user)
                .job(job)
                .cv(cv)
                .status(Application.ApplicationStatus.PENDING)
                .build();
        applicationRepository.save(application);

        return toApplicationDTOResponse(application);
    }

    public ApplicationRequestDTO updateApplicationStatus(String id, ApplicationRequestDTO status) {
        User user = authService.getCurrentUser();

        if (user.getRole().name().equals("JOB_SEEKER")) {
            throw new RuntimeException("Job Seekers cannot update application status");
        }

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        jobRepository.findByIdAndRecruiterId(application.getJob().getId(), user.getId())
                .orElseThrow(() -> new RuntimeException("You should be the job's recruiter to update application status"));

        switch (status.getStatus()) {
            case "INTERVIEW" -> application.setStatus(Application.ApplicationStatus.INTERVIEW);
            case "ACCEPTED" -> application.setStatus(Application.ApplicationStatus.ACCEPTED);
            case "REJECTED" -> application.setStatus(Application.ApplicationStatus.REJECTED);
            default -> throw new RuntimeException("Invalid status");
        }
        applicationRepository.save(application);

        return toApplicationDTOResponse(application);
    }

    public ApplicationRequestDTO toApplicationDTOResponse(Application application) {
        return new ApplicationRequestDTO(
                application.getId(),
                application.getJob().getId(),
                application.getCv().getId(),
                application.getStatus().name()
        );
    }

}
