package com.example.demospringsecurity.model;

import com.example.demospringsecurity.mapper.SecurityUtil;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String receiverName;
    String receiverPhone;
    String receiverAddress;
    float totalPrice;

    String paymentMethod;

    String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    Instant createdAt;
    String createdBy;

    @PrePersist
    public void handleBeforeCreate() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        this.createdAt = Instant.now();
    }

}
