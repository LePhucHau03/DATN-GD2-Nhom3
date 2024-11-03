package com.example.demospringsecurity.repository;

import com.example.demospringsecurity.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findAllByUserId(Long userId);
    boolean existsByUserIdAndId(Long userId, Long cartId);
    CartItem findByUserIdAndProductId(Long userId, Long productId);
    void deleteAllByUserId(Long userId);
}
