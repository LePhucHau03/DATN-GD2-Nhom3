package com.example.demospringsecurity.mapper;

import com.example.demospringsecurity.dto.request.CategoryCreateRequestDTO;
import com.example.demospringsecurity.dto.request.CategoryUpdateRequestDTO;
import com.example.demospringsecurity.dto.response.CategoryResponse;
import com.example.demospringsecurity.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapping {
    Category fromCategoryCreateRequestDTOToCategory(CategoryCreateRequestDTO categoryCreateRequestDTO);
//    Category fromCategoryUpdateRequestDTOToCategory(CategoryUpdateRequestDTO categoryUpdateRequestDTO);
    void updateCategory(@MappingTarget Category category, CategoryUpdateRequestDTO categoryUpdateRequestDTO);
    CategoryResponse fromCategoryToCategoryResponse(Category category);
}
