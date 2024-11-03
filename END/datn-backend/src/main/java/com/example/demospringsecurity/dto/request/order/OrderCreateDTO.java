package com.example.demospringsecurity.dto.request.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderCreateDTO {
    @NotBlank
    String receiverName;
    @NotBlank
    String receiverPhone;
    @NotBlank
    String receiverAddress;

    float totalPrice;
    String paymentMethod;


    long userId;

    List<OderDetail> orderDetails;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OderDetail {
        @NotBlank
        String productName;

        @NotNull
        @Min(1)
        float price;

        @Min(1)
        long productId;

        @Min(1)
        int quantity;


    }
}
