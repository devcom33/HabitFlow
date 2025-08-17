package org.heymouad.focusapp.services;

import org.heymouad.focusapp.entities.HabitCompletion;

import java.util.List;

public interface HabitCompletionService {
    HabitCompletion saveHabitCompletion(HabitCompletion habitCompletion);
    List<HabitCompletion> getAllHabitsStatus();
    List<HabitCompletion> getTodayHabitsStatus();
    HabitCompletion updateHabitCompletionStatus(Long id, Boolean completed);
}
