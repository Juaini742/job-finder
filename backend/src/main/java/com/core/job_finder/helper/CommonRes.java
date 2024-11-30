package com.core.job_finder.helper;

public record CommonRes<T>(Integer status, String message, T data) {
}
