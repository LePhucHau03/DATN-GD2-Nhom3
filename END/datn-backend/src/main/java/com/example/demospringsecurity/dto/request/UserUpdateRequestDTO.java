package com.example.demospringsecurity.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserUpdateRequestDTO {
    @NotNull
    private long id;
    @NotBlank
    @Size(min = 3, max = 20)
    private String name;
    @NotBlank
    String firstName;

    boolean enabled;
}
