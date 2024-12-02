package com.core.job_finder.application;


import com.core.job_finder.auth.AuthService;
import com.core.job_finder.cv.Cv;
import com.core.job_finder.cv.CvRepository;
import com.core.job_finder.cv.CvService;
import com.core.job_finder.jobs.job.Job;
import com.core.job_finder.jobs.job.JobRepository;
import com.core.job_finder.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CvRepository cvRepository;
    private final AuthService authService;
    private final JobRepository jobRepository;
    private final CvService cvService;

    public ApplicationResponse getApplicationById(String id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        return toApplicationResponse(application);
    }

    private ApplicationResponse toApplicationResponse(Application application) {
        return new ApplicationResponse(
                application.getId(),
                application.getUser().getId(),
                application.getJob().getId(),
                application.getStatus().name(),
                cvService.toCvResponse(application.getCv())
        );
    }

    public void createApplication(ApplicationRequestDTO applicationRequestDTO) {
        User user = authService.getCurrentUser();

        Cv cv = cvRepository.findById(applicationRequestDTO.getCvId())
                .orElseThrow(() -> new RuntimeException("CV not found"));

        Job job = jobRepository.findById(applicationRequestDTO.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        Application application = Application.builder()
                .user(user)
                .job(job)
                .cv(cv)
                .status(Application.ApplicationStatus.PENDING)
                .build();
        applicationRepository.save(application);
    }
}
