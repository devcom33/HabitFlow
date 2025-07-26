package org.heymouad.focusapp.services;


import org.heymouad.focusapp.entities.Habit;

import java.util.List;

public interface HabitService {
    Habit saveHabit(Habit habit);
    Habit updateHabit(Long id, Boolean completed);
    List<Habit> getAllHabit();
}
