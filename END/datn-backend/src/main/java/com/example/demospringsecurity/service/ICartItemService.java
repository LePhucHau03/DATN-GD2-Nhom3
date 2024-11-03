package com.example.demospringsecurity.service;

import com.example.demospringsecurity.dto.request.AdToCartDTO;
import com.example.demospringsecurity.dto.request.ChangeCartQuantityDTO;
import com.example.demospringsecurity.model.CartItem;

import java.util.List;

public interface ICartItemService {
    void addToCart(AdToCartDTO adToCartDTO);

    List<CartItem> findAllCartItems(long userId);

    void changeCartItemQuantity(ChangeCartQuantityDTO changeCartQuantityDTO);

    void deleteCartItemByUserID(long userId);

    void deleteOneCartItem(long id);
}
