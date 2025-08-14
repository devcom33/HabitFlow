package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.entities.HabitCompletion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitCompletionRepository extends JpaRepository<HabitCompletion, Long> {
}
