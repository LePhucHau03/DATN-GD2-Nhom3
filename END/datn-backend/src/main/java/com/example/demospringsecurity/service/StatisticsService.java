package com.example.demospringsecurity.service;


import com.example.demospringsecurity.dto.response.order.CategoryProductCount;
import com.example.demospringsecurity.dto.response.order.CountUserOrder;
import com.example.demospringsecurity.dto.response.order.RevenueStatisticsByMonthAndYear;

import java.util.List;

public interface StatisticsService {
    List<RevenueStatisticsByMonthAndYear> findRevenueStatisticsByMonthAndYear();
    List<CategoryProductCount> categoryProductCount();
    List<CountUserOrder> countUserOrder();
}
