package org.heymouad.focusapp.services;


import org.heymouad.focusapp.entities.Habit;

import java.util.List;
import java.util.Optional;

public interface HabitService {
    Habit saveHabit(Habit habit);
    List<Habit> getAllHabit();

    Optional<Habit> getById(Long habitId);
}
