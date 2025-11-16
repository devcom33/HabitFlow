package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.entities.AppUser;
import org.heymouad.focusapp.entities.Category;
import org.heymouad.focusapp.entities.Habit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Long> {
    Page<Habit> findByCategoryAndAppUser(Category category, AppUser appUser,Pageable pageable);

    Page<Habit> findAllByAppUser(AppUser appUser, Pageable pageable);
}
