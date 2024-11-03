package com.example.demospringsecurity.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    private Date timestamp;
    private String message;
    private int status;
    private String error;
    private String path;
}
