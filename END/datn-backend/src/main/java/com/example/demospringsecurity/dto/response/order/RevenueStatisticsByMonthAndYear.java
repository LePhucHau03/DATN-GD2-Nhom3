package com.example.demospringsecurity.dto.response.order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RevenueStatisticsByMonthAndYear {
    private String monthYear;  // Tháng-năm dưới dạng "MM-yyyy"
    private Double totalRevenue;

    public RevenueStatisticsByMonthAndYear(String monthYear, Double totalRevenue) {
        this.monthYear = monthYear;
        this.totalRevenue = totalRevenue;
    }
}

