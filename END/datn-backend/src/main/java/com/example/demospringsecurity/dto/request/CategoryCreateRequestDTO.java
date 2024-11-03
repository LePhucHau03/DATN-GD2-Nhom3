package com.example.demospringsecurity.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;


@Getter
public class CategoryCreateRequestDTO {
    @NotBlank
    String name;
}
