package org.heymouad.focusapp.services;


import org.heymouad.focusapp.entities.Habit;

import java.util.List;

public interface HabitService {
    Habit saveHabit(Habit habit);
    List<Habit> getAllHabit();
}
