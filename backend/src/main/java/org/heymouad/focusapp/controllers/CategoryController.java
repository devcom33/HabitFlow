package org.heymouad.focusapp.controllers;

import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.dtos.CategoryResponse;
import org.heymouad.focusapp.entities.Category;
import org.heymouad.focusapp.mappers.CategoryMapper;
import org.heymouad.focusapp.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> getAllCategories()
    {
        List<Category> categoryList = categoryService.getAllCategories();
        List<CategoryResponse> categoryResponses = categoryList
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .toList();
        return ResponseEntity.ok(categoryResponses);
    }
}
