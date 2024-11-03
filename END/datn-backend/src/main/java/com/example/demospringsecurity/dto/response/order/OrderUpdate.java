package com.example.demospringsecurity.dto.response.order;

import lombok.Getter;

@Getter
public class OrderUpdate {
    long id;
    String status;
    String receiverAddress;
}
