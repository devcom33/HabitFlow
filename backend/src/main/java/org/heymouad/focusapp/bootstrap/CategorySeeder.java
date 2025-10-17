package org.heymouad.focusapp.bootstrap;


import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.entities.Category;
import org.heymouad.focusapp.repositories.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class CategorySeeder implements CommandLineRunner {
    private final CategoryRepository categoryRepository;

    public void run(String... args) {
        if ((long) categoryRepository.findAll().size() == 0)
        {
            String [] categoriesTypes = new String[]{"Fitness", "Art", "Finances", "Health", "Nutrition", "Social", "Study", "Work", "Morning", "Day"};
            ArrayList<Category> categories = new ArrayList<>();

            for (String category : categoriesTypes) {
                categories.add(new Category(null, category));
            }
            categoryRepository.saveAll(categories);
        }
    }
}
