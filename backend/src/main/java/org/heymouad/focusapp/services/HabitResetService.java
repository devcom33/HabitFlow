package org.heymouad.focusapp.services;

import java.time.LocalDate;

public interface HabitResetService {
    void resetDailyHabits(LocalDate date);
}
