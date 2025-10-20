package org.heymouad.focusapp.services.servicesImpl;

import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.entities.Category;
import org.heymouad.focusapp.repositories.CategoryRepository;
import org.heymouad.focusapp.services.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;


    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
