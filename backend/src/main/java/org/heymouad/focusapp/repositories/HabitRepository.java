package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.entities.Habit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitRepository extends JpaRepository<Habit, Long> {
}
