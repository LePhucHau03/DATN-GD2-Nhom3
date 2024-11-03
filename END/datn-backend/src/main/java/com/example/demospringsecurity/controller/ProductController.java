package com.example.demospringsecurity.controller;

import com.example.demospringsecurity.dto.request.ProductCreateDTO;
import com.example.demospringsecurity.dto.request.ProductUpdateDTO;
import com.example.demospringsecurity.dto.response.RestResponse;
import com.example.demospringsecurity.model.Product;
import com.example.demospringsecurity.service.IProductService;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
@Validated
public class ProductController {
    private final IProductService productService;
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody ProductCreateDTO productCreateRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(productCreateRequestDTO));
    }
    @PutMapping
    public ResponseEntity<?> update(@Valid @RequestBody ProductUpdateDTO productUpdateRequestDTO) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(productService.updateProduct(productUpdateRequestDTO));
    }
    @DeleteMapping("/{id}")
    public RestResponse<?> delete(@Min(1)@PathVariable Long id) {
        productService.deleteProduct(id);
        return RestResponse.builder()
                .statusCode(204)
                .message("Deleted")
                .build();
    }
    @GetMapping
    public ResponseEntity<?> getAll(@Filter Specification<Product> specification, Pageable pageable) {
        return ResponseEntity.ok().body(productService.getAllProduct(specification, pageable));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok().body(productService.getProductById(id));
    }
}
