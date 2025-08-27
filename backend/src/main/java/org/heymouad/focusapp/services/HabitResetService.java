package org.heymouad.focusapp.services;

import org.heymouad.focusapp.entities.Habit;

import java.time.LocalDate;

public interface HabitResetService {
    void resetDailyHabits(LocalDate date);
}
