package com.example.demospringsecurity.repository;

import com.example.demospringsecurity.dto.response.order.RevenueStatisticsByMonthAndYear;
import com.example.demospringsecurity.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    @Query("SELECT sum(o.totalPrice) from Order o")
    Double findTotalPrice();

    List<Order> findAllByUserId(Long userId);

    @Query("SELECT new com.example.demospringsecurity.dto.response.order.RevenueStatisticsByMonthAndYear(CONCAT(FUNCTION('LPAD', CAST(MONTH(o.createdAt) AS STRING), 2, '0'), '-', YEAR(o.createdAt)), SUM(o.totalPrice)) " +
            "FROM Order o " +
            "WHERE o.status = 'Hoàn thành' " +  // Filter by "Hoàn thành" status
            "GROUP BY YEAR(o.createdAt), MONTH(o.createdAt), CONCAT(FUNCTION('LPAD', CAST(MONTH(o.createdAt) AS STRING), 2, '0'), '-', YEAR(o.createdAt)) " +
            "ORDER BY YEAR(o.createdAt), MONTH(o.createdAt)")
    List<RevenueStatisticsByMonthAndYear> findRevenueStatisticsByMonthAndYear();



}