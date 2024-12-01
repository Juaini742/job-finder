package com.core.job_finder.companies.company;


import com.core.job_finder.helper.GlobalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
