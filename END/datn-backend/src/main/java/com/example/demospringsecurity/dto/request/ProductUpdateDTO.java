package com.example.demospringsecurity.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ProductUpdateDTO {

    long id;
    @NotBlank
    String name;

    @Min(1)
    float price;

    String imageUrl;

    @NotBlank
    String description;

    long categoryId;

    boolean active;

}
