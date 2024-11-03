package com.example.demospringsecurity.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class RegisterRequestDTO implements Serializable {
    @NotBlank
    private String name;
    @NotBlank
    private String firstName;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String confirmPassword;
}
