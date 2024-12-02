package com.core.job_finder.application;


import com.core.job_finder.helper.GlobalResponse;
import com.core.job_finder.interfaces.onCreate;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/application")
@Validated
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getApplication(@PathVariable String id) {
        ApplicationResponse applicationResponse = applicationService.getApplicationById(id);
        return GlobalResponse.buildResponse(HttpStatus.OK, "Application retrieved successfully", applicationResponse);
    }

    @PostMapping
    public ResponseEntity<?> createApplication(@Validated(onCreate.class) @RequestBody ApplicationRequestDTO applicationRequestDTO) {
        applicationService.createApplication(applicationRequestDTO);
        return GlobalResponse.buildResponse(HttpStatus.OK, "Application retrieved successfully", null);
    }
}
