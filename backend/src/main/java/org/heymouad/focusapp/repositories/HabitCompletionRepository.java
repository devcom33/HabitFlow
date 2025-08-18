package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HabitCompletionRepository extends JpaRepository<HabitCompletion, Long> {
    List<HabitCompletion> findHabitCompletionByCompletionDate(LocalDate completionDate);
    boolean existsByHabitAndCompletionDate(Habit habit, LocalDate date);

}
