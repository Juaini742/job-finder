package com.core.job_finder.application;


import com.core.job_finder.interfaces.onCreate;
import com.core.job_finder.interfaces.onUpdate;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationRequestDTO {

    @NotBlank(message = "Job ID is required", groups = {onCreate.class, onUpdate.class})
    String jobId;

    @NotBlank(message = "CV ID is required", groups = {onCreate.class, onUpdate.class})
    String cvId;

    @NotBlank(message = "Status is required", groups = {onUpdate.class})
    String status;
}
