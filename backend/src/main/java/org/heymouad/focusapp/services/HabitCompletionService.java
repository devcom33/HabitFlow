package org.heymouad.focusapp.services;

import org.heymouad.focusapp.entities.HabitCompletion;

public interface HabitCompletionService {
    HabitCompletion saveHabitCompletion(HabitCompletion habitCompletion);
    HabitCompletion updateHabitCompletionStatus(Long id, Boolean completed);
}
