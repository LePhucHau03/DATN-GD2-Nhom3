package com.example.demospringsecurity.repository;

import com.example.demospringsecurity.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category> {
    boolean existsByName(String name);

    @Query(value = "select categories.name, count(products.id) " +
            "from categories " +
            "join products on categories.id = products.category_id " +
            "group by categories.id", nativeQuery = true
    )
    List<Object[]> countProductByCategory();
}
