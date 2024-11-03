package com.example.demospringsecurity.controller;

import com.example.demospringsecurity.dto.request.order.OrderCreateDTO;
import com.example.demospringsecurity.dto.response.RestResponse;
import com.example.demospringsecurity.dto.response.order.OrderUpdate;
import com.example.demospringsecurity.model.Order;
import com.example.demospringsecurity.service.OrderService;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/v1/order")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderCreateDTO orderCreateDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(orderCreateDTO));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@Min(1)@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(id));
    }
    @GetMapping
    public ResponseEntity<?> getAllOrders(@Filter Specification<Order> specification, Pageable pageable) {
        return ResponseEntity.ok(orderService.findAll(specification, pageable));
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(orderService.getAll());
    }
    @PutMapping
    public RestResponse<?> updateOrder(@RequestBody OrderUpdate orderUpdate){
        orderService.update(orderUpdate);
        return RestResponse.builder()
                .statusCode(203)
                .message("Update successfully")
                .build();
    }
    @DeleteMapping("/{id}")
    public RestResponse<?> deleteOrder(@PathVariable Long id){
        orderService.delete(id);

        return RestResponse.builder()
                .statusCode(204)
                .message("Delete successfully")
                .build();
    }
}
