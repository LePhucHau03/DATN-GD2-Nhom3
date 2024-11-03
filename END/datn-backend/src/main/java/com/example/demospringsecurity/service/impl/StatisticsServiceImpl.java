package com.example.demospringsecurity.service.impl;

import com.example.demospringsecurity.dto.response.order.CategoryProductCount;
import com.example.demospringsecurity.dto.response.order.CountUserOrder;
import com.example.demospringsecurity.dto.response.order.RevenueStatisticsByMonthAndYear;
import com.example.demospringsecurity.repository.CategoryRepository;
import com.example.demospringsecurity.repository.OrderRepository;
import com.example.demospringsecurity.repository.ProductRepository;
import com.example.demospringsecurity.repository.UserRepository;
import com.example.demospringsecurity.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository bookRepository;
    private final CategoryRepository categoryRepository;
    @Override
    public List<RevenueStatisticsByMonthAndYear> findRevenueStatisticsByMonthAndYear() {
        return orderRepository.findRevenueStatisticsByMonthAndYear();
    }

    @Override
    public List<CategoryProductCount> categoryProductCount() {
        List<Object[]> objects = categoryRepository.countProductByCategory();

        return objects.stream().map(o -> new CategoryProductCount((String) o[0], ((Number) o[1]).longValue()))
                .toList();
    }

    @Override
    public List<CountUserOrder> countUserOrder() {
        List<Object[]> objects = userRepository.countUserOrder();

        return objects.stream().map(o -> new CountUserOrder((String) o[0], ((Number) o[1]).longValue())).toList();
    }
}
