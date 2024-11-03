package com.example.demospringsecurity.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyUserRequestDTO {
    private String email;
    private String verificationCode;
}
