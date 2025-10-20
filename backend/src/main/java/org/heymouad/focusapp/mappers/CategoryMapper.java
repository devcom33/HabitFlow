package org.heymouad.focusapp.mappers;


import org.heymouad.focusapp.dtos.CategoryRequest;
import org.heymouad.focusapp.dtos.CategoryResponse;
import org.heymouad.focusapp.entities.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toCategoryResponse(Category category);
    CategoryRequest toCategoryRequest(Category category);
}
