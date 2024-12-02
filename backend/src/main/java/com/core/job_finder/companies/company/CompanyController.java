package com.core.job_finder.companies.company;


import com.core.job_finder.helper.GlobalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("/api/secured/company")
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<?> createCompany(@Validated @RequestBody CompanyRequestDTO companyRequestDTO) {
        CompanyResponse companyResponse = companyService.createCompany(companyRequestDTO);
        return GlobalResponse.buildResponse(HttpStatus.CREATED, "Company created successfully", companyResponse);
    }

    @PutMapping
    public ResponseEntity<?> updateCompany(@Validated @RequestBody CompanyRequestDTO companyRequestDTO) {
        CompanyResponse companyResponse = companyService.updateCompany(companyRequestDTO);
        return GlobalResponse.buildResponse(HttpStatus.OK, "Company updated successfully", companyResponse);
    }
}
