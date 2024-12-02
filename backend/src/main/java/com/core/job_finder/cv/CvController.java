package com.core.job_finder.cv;


import com.core.job_finder.helper.GlobalResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/cv")
@Validated
public class CvController {

    private final CvService cvService;

    @GetMapping
    public ResponseEntity<?> getCv() {
        CvResponse cv = cvService.findCvByUserId();
        return GlobalResponse.buildResponse(HttpStatus.OK, "Cv fetched successfully", cv);
    }

    @PostMapping
    public ResponseEntity<?> createCv(@Valid @RequestBody CvRequestDTO cvRequestDTO) {
        CvResponse cv = cvService.createCv(cvRequestDTO);
        return GlobalResponse.buildResponse(HttpStatus.OK, "Cv created successfully", cv);
    }

}
