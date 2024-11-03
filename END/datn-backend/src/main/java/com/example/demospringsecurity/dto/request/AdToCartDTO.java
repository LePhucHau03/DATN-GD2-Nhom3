package com.example.demospringsecurity.dto.request;

import jakarta.validation.constraints.Min;
import lombok.Getter;

@Getter
public class AdToCartDTO {
    @Min(1)
    Long userID;
    @Min(1)
    Long productID;
    @Min(1)
    int quantity;
}
