package com.example.demospringsecurity.controller;

import com.example.demospringsecurity.dto.request.CategoryCreateRequestDTO;
import com.example.demospringsecurity.dto.request.CategoryUpdateRequestDTO;
import com.example.demospringsecurity.dto.response.RestResponse;
import com.example.demospringsecurity.model.Category;
import com.example.demospringsecurity.service.CategoryService;
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
@RequestMapping("/api/v1/category")
@Validated
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CategoryCreateRequestDTO categoryCreateRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(categoryCreateRequestDTO));
    }
    @PutMapping
    public ResponseEntity<?> update(@Valid @RequestBody CategoryUpdateRequestDTO categoryUpdateRequestDTO) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(categoryService.update(categoryUpdateRequestDTO));
    }
    @DeleteMapping("/{id}")
    public RestResponse<?> delete(@Min(1)@PathVariable Long id) {
        categoryService.delete(id);
        return RestResponse.builder()
                .statusCode(204)
                .message("Deleted")
                .build();
    }
    @GetMapping
    public ResponseEntity<?> getAll(@Filter Specification<Category> specification, Pageable pageable) {
        return ResponseEntity.ok().body(categoryService.getAllCategories(specification, pageable));
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAlla() {
        return ResponseEntity.ok().body(categoryService.getAllCategories());
    }
}
