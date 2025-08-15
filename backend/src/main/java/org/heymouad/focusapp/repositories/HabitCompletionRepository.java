package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.entities.HabitCompletion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface HabitCompletionRepository extends JpaRepository<HabitCompletion, Long> {
    Optional<HabitCompletion> findByHabitIdAndCompletionDate(Long Id, LocalDate localDate);
}
