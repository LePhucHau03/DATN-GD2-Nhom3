package com.example.demospringsecurity.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class ChangePasswordDTO {
    @Min(1)
    private long id;
    @NotBlank
    private String currentPassword;
    @NotBlank
    @Size(min = 4)
    private String newPassword;
    @NotBlank
    private String confirmPassword;
}
