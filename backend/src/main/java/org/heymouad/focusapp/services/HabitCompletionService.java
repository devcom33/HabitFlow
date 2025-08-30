package org.heymouad.focusapp.services;

import org.heymouad.focusapp.dtos.HabitCompletionDto;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.exceptions.HabitCompletionDataException;
import org.heymouad.focusapp.exceptions.HabitCompletionServiceException;

import java.util.List;

public interface HabitCompletionService {
    HabitCompletion saveHabitCompletion(HabitCompletion habitCompletion) throws HabitCompletionServiceException;
    List<HabitCompletionDto> getAllHabitsStatus();
    List<HabitCompletionDto> getTodayHabitsStatus();
    HabitCompletion updateHabitCompletionStatus(Long id, Boolean completed);
    public List<HabitCompletionDto> getHabitsCompletionByHabitId(Long habitId);
}
