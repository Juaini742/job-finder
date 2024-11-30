package com.core.job_finder.helper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class GlobalResponse {

    public static <T> ResponseEntity<CommonRes<T>> buildResponse(HttpStatus status, String message, T data) {
        CommonRes<T> res = new CommonRes<>(status.value(), message, data);
        return ResponseEntity.status(status).body(res);
    }
}
