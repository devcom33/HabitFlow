package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.entities.Category;
import org.heymouad.focusapp.entities.Habit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Long> {
    Page<Habit> findByCategory(Category category, Pageable pageable);

    Page<Habit> findAll(Pageable pageable);
}
