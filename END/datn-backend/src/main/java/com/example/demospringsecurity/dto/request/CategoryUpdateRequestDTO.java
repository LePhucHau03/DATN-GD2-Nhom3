package com.example.demospringsecurity.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryUpdateRequestDTO {
    @NotNull
    long id;
    @NotBlank
    String name;
    boolean active;
}
