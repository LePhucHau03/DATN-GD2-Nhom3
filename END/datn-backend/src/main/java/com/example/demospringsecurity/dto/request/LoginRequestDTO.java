package com.example.demospringsecurity.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

import java.io.Serializable;
@Getter
public class LoginRequestDTO implements Serializable {
    @NotBlank
    @Email
    private String username;
    @NotBlank
    private String password;
}
