package org.heymouad.focusapp.services;


import org.heymouad.focusapp.entities.AppUser;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.exceptions.HabitServiceException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface HabitService {
    Habit saveHabit(Habit habit, AppUser appUser) throws HabitServiceException;
    Page<Habit> getHabits(Pageable pageable) throws HabitServiceException;
    Page<Habit> getHabitsByCategory(String categoryName, Pageable pageable);
    Optional<Habit> getById(Long habitId) throws HabitServiceException;
}
