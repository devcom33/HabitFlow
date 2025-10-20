package org.heymouad.focusapp.services;


import org.heymouad.focusapp.entities.AppUser;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.exceptions.HabitServiceException;

import java.util.List;
import java.util.Optional;

public interface HabitService {
    Habit saveHabit(Habit habit, AppUser appUser) throws HabitServiceException;
    List<Habit> getAllHabits() throws HabitServiceException;

    Optional<Habit> getById(Long habitId) throws HabitServiceException;
}
