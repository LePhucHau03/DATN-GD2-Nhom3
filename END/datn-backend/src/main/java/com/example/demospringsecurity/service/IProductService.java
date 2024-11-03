package com.example.demospringsecurity.service;

import com.example.demospringsecurity.dto.request.ProductCreateDTO;
import com.example.demospringsecurity.dto.request.ProductUpdateDTO;
import com.example.demospringsecurity.dto.response.ResultPaginationResponse;
import com.example.demospringsecurity.model.Category;
import com.example.demospringsecurity.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface IProductService {
    Product getProductById(long id);
    Product createProduct(ProductCreateDTO productCreateDTO);
    Product updateProduct(ProductUpdateDTO productUpdateDTO);
    void deleteProduct(long id);
    ResultPaginationResponse getAllProduct(Specification<Product> specification, Pageable pageable);
}
