package com.example.demospringsecurity.controller;

import com.example.demospringsecurity.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/api/v1/statistics")
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping("/find-revenue-statistics-by-month-and-year")
    public ResponseEntity<?> findRevenueStatisticsByMonthAndYear() {
        log.info("find-revenue-statistics-by-month-and-year");
        return ResponseEntity.ok(statisticsService.findRevenueStatisticsByMonthAndYear());
    }
    @GetMapping("/category-product-count")
    public ResponseEntity<?> categoryBookCount() {
        log.info("category-book-count");
        return ResponseEntity.ok(statisticsService.categoryProductCount());
    }
    @GetMapping("/count-user-order")
    public ResponseEntity<?> countUserOrder() {
        log.info("count-user-order");
        return ResponseEntity.ok(statisticsService.countUserOrder());
    }
}
