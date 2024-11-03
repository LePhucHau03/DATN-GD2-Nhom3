package com.example.demospringsecurity.service.impl;

import com.example.demospringsecurity.dto.request.AdToCartDTO;
import com.example.demospringsecurity.dto.request.ChangeCartQuantityDTO;
import com.example.demospringsecurity.exception.ResourceNotFoundException;
import com.example.demospringsecurity.model.CartItem;
import com.example.demospringsecurity.repository.CartItemRepository;
import com.example.demospringsecurity.repository.ProductRepository;
import com.example.demospringsecurity.repository.UserRepository;
import com.example.demospringsecurity.service.ICartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ICartItemServiceImpl implements ICartItemService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public void addToCart(AdToCartDTO adToCartDTO) {
        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(adToCartDTO.getUserID(), adToCartDTO.getProductID());
        if(cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + adToCartDTO.getQuantity());
            cartItemRepository.save(cartItem);
        }else{
            cartItemRepository.save(CartItem.builder()
                    .user(userRepository.findById(adToCartDTO.getUserID()).orElseThrow(()->new ResourceNotFoundException("User not found")))
                    .product(productRepository.findById(adToCartDTO.getProductID()).orElseThrow(()->new ResourceNotFoundException("Product not found")))
                    .quantity(adToCartDTO.getQuantity())
                    .build());
        }
    }

    @Override
    public List<CartItem> findAllCartItems(long userId) {
        return cartItemRepository.findAllByUserId(userId);
    }

    @Override
    public void changeCartItemQuantity(ChangeCartQuantityDTO changeCartQuantityDTO) {
        CartItem cartItem = cartItemRepository.findById(changeCartQuantityDTO.getCartId()).orElseThrow(()->new ResourceNotFoundException("Cart Item Not Found"));
        if(changeCartQuantityDTO.getQuantity()<= 0) {
            cartItem.setQuantity(1);
            cartItemRepository.save(cartItem);
        }else{
            cartItem.setQuantity(changeCartQuantityDTO.getQuantity());
            cartItemRepository.save(cartItem);
        }
    }

    @Override
    public void deleteCartItemByUserID(long userId) {
        userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("User not found"));
        cartItemRepository.deleteAll(findAllCartItems(userId));
    }

    @Override
    public void deleteOneCartItem(long id) {
        cartItemRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Cart Item Not Found"));
        cartItemRepository.deleteById(id);
    }
}
