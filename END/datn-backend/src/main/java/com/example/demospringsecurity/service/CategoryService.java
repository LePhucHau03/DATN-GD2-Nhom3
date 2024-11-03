package com.example.demospringsecurity.service;

import com.example.demospringsecurity.dto.request.CategoryCreateRequestDTO;
import com.example.demospringsecurity.dto.request.CategoryUpdateRequestDTO;
import com.example.demospringsecurity.dto.response.ResultPaginationResponse;
import com.example.demospringsecurity.dto.response.CategoryResponse;
import com.example.demospringsecurity.model.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface CategoryService {
    CategoryResponse create(CategoryCreateRequestDTO categoryCreateRequestDTO);
    CategoryResponse update(CategoryUpdateRequestDTO categoryUpdateRequestDTO);
    void delete(Long id);
    ResultPaginationResponse getAllCategories(Specification<Category> specification, Pageable pageable);
    Category getCategoryById(Long id);
    List<Category> getAllCategories();
}
