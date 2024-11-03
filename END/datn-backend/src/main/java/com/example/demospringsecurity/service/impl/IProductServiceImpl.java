package com.example.demospringsecurity.service.impl;

import com.example.demospringsecurity.dto.request.ProductCreateDTO;
import com.example.demospringsecurity.dto.request.ProductUpdateDTO;
import com.example.demospringsecurity.dto.response.ResultPaginationResponse;
import com.example.demospringsecurity.model.Product;
import com.example.demospringsecurity.repository.CategoryRepository;
import com.example.demospringsecurity.repository.ProductRepository;
import com.example.demospringsecurity.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IProductServiceImpl implements IProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    @Override
    public Product getProductById(long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    @Override
    public Product createProduct(ProductCreateDTO productCreateDTO) {

        if(productRepository.existsByName(productCreateDTO.getName())) {
            throw new RuntimeException("Product name already exist");
        }
        Product product = new Product();
        product.setName(productCreateDTO.getName());
        product.setPrice(productCreateDTO.getPrice());
        product.setDescription(productCreateDTO.getDescription());
        product.setActive(true);
        product.setImageUrl(productCreateDTO.getImageUrl());
        product.setCategory(categoryRepository.findById(productCreateDTO.getCategoryId()).orElseThrow(() -> new RuntimeException("Category Not found")));

        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(ProductUpdateDTO productUpdateDTO) {

        Product product = this.getProductById(productUpdateDTO.getId());
        product.setName(productUpdateDTO.getName());
        product.setPrice(productUpdateDTO.getPrice());
        product.setDescription(productUpdateDTO.getDescription());
        product.setActive(productUpdateDTO.isActive());
        product.setImageUrl(productUpdateDTO.getImageUrl());
        product.setCategory(categoryRepository.findById(productUpdateDTO.getCategoryId()).orElseThrow(() -> new RuntimeException("Category Not found")));

        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(long id) {
        Product product = this.getProductById(id);
        product.setActive(false);
        productRepository.save(product);
    }

    @Override
    public ResultPaginationResponse getAllProduct(Specification<Product> specification, Pageable pageable) {
        Page<Product> categoryPage = productRepository.findAll(specification, pageable);

        ResultPaginationResponse.Meta meta = ResultPaginationResponse.Meta.builder()
                .total(categoryPage.getTotalElements())
                .pages(categoryPage.getTotalPages())
                .page(pageable.getPageNumber() + 1)
                .pageSize(pageable.getPageSize())
                .build();
        List<Product> categoryResponses = categoryPage.getContent();
        return ResultPaginationResponse.builder()
                .meta(meta)
                .result(categoryResponses)
                .build();
    }
}
