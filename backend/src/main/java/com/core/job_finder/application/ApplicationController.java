package com.core.job_finder.application;


import com.core.job_finder.helper.GlobalResponse;
import com.core.job_finder.interfaces.onCreate;
import com.core.job_finder.interfaces.onUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/application")
@Validated
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping("/recruiter")
    public ResponseEntity<?> getApplicationRecruiter() {
        List<AppWithCompanyResponse> applicationResponse = applicationService.getApplicationRecruiter();
        return GlobalResponse.buildResponse(HttpStatus.OK, "Application retrieved successfully", applicationResponse);
    }

    @GetMapping
    public ResponseEntity<?> getApplicationByUser() {
        List<AppWithCompanyResponse> applicationResponse = applicationService.getApplicationByUser();
        return GlobalResponse.buildResponse(HttpStatus.OK, "Application retrieved successfully", applicationResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicationById(@PathVariable String id) {
        ApplicationResponse applicationResponse = applicationService.getApplicationById(id);
        return GlobalResponse.buildResponse(HttpStatus.OK, "Application retrieved successfully", applicationResponse);
    }

    @PostMapping
    public ResponseEntity<?> createApplication(@Validated(onCreate.class) @RequestBody ApplicationRequestDTO applicationRequestDTO) {
        ApplicationRequestDTO app = applicationService.createApplication(applicationRequestDTO);
        return GlobalResponse.buildResponse(HttpStatus.OK, "Application retrieved successfully", app);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStatusApplication(@PathVariable String id, @Validated(onUpdate.class) @RequestBody ApplicationRequestDTO applicationRequestDTO) {
        ApplicationRequestDTO app = applicationService.updateApplicationStatus(id, applicationRequestDTO);
        return GlobalResponse.buildResponse(HttpStatus.OK, "Application retrieved successfully", app);
    }
}
