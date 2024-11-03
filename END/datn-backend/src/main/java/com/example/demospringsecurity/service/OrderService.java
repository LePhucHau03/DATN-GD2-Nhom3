package com.example.demospringsecurity.service;

import com.example.demospringsecurity.dto.request.order.OrderCreateDTO;
import com.example.demospringsecurity.dto.response.ResultPaginationResponse;
import com.example.demospringsecurity.dto.response.order.OrderResponse;
import com.example.demospringsecurity.dto.response.order.OrderUpdate;
import com.example.demospringsecurity.model.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface OrderService {
    Order createOrder(OrderCreateDTO orderCreateDTO);
    List<OrderResponse> getOrdersByUserId(Long id);
    ResultPaginationResponse findAll(Specification<Order> spec, Pageable pageable);
    List<OrderResponse> getAll();
    void update(OrderUpdate orderUpdate);
    void delete(Long id);
}
