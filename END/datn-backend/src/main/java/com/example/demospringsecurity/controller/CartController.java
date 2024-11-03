package com.example.demospringsecurity.controller;

import com.example.demospringsecurity.dto.request.AdToCartDTO;
import com.example.demospringsecurity.dto.request.ChangeCartQuantityDTO;
import com.example.demospringsecurity.dto.response.RestResponse;
import com.example.demospringsecurity.service.ICartItemService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart")
@Validated
public class CartController {
    private final ICartItemService cartItemService;
    @PostMapping
    public RestResponse<?> create(@Valid @RequestBody AdToCartDTO adToCartDTO) {
        cartItemService.addToCart(adToCartDTO);
        return RestResponse.builder()
                .statusCode(202)
                .message("Add to cart successfully")
                .build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCartByUserId(@Min(1)@PathVariable Long id) {
        return ResponseEntity.ok().body(cartItemService.findAllCartItems(id));
    }
    @PostMapping("/change-cart-quantity")
    public RestResponse<?> changeQuantity(@Valid @RequestBody ChangeCartQuantityDTO adToCartDTO) {
        cartItemService.changeCartItemQuantity(adToCartDTO);
        return RestResponse.builder()
                .statusCode(202)
                .message("Change quantity successfully")
                .build();
    }
    @DeleteMapping("/{id}")
    public RestResponse<?> delete(@Min(1)@PathVariable Long id) {
        cartItemService.deleteCartItemByUserID(id);
        return RestResponse.builder()
                .statusCode(204)
                .message("Delete successfully")
                .build();
    }

    @DeleteMapping("/delete-one/{id}")
    public RestResponse<?> deleteOne(@Min(1)@PathVariable Long id) {
        cartItemService.deleteOneCartItem(id);
        return RestResponse.builder()
                .statusCode(204)
                .message("Delete successfully")
                .build();
    }
}
