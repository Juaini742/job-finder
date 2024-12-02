package com.core.job_finder.jobs.job;


import com.core.job_finder.helper.GlobalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/job")
public class JobController {

    private final JobService jobService;

    @GetMapping("{id}")
    public ResponseEntity<?> getJobById(@PathVariable String id) {
        JobResponse job = jobService.findJobById(id);
        return GlobalResponse.buildResponse(HttpStatus.OK, "Jobs fetched successfully", job);
    }

    @GetMapping
    public ResponseEntity<?> getAllJobs() {
        List<JobResponse> jobs = jobService.findAllJobByUserId();
        return GlobalResponse.buildResponse(HttpStatus.OK, "Jobs fetched successfully", jobs);
    }

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody JobRequestDTO jobRequestDTO) {
        JobResponse job =  jobService.createJob(jobRequestDTO);
        return GlobalResponse.buildResponse(HttpStatus.CREATED, "Job created successfully", job);
    }
}
