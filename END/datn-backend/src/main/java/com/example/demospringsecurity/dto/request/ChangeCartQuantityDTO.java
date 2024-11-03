package com.example.demospringsecurity.dto.request;

import lombok.Getter;

@Getter
public class ChangeCartQuantityDTO {
    private long cartId;
    private int quantity;
}
