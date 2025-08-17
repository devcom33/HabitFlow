package org.heymouad.focusapp.services;

import org.heymouad.focusapp.dtos.HabitCompletionDto;
import org.heymouad.focusapp.entities.HabitCompletion;

import java.util.List;

public interface HabitCompletionService {
    HabitCompletion saveHabitCompletion(HabitCompletion habitCompletion);
    List<HabitCompletionDto> getAllHabitsStatus();
    List<HabitCompletionDto> getTodayHabitsStatus();
    HabitCompletion updateHabitCompletionStatus(Long id, Boolean completed);
}
