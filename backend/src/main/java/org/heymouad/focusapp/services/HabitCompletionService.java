package org.heymouad.focusapp.services;

import org.heymouad.focusapp.dtos.HabitCompletionDto;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.exceptions.HabitCompletionDataException;
import org.heymouad.focusapp.exceptions.HabitCompletionServiceException;

import java.util.List;

public interface HabitCompletionService {
    HabitCompletion saveHabitCompletion(HabitCompletion habitCompletion) throws HabitCompletionServiceException;
    List<HabitCompletionDto> getAllHabitsStatus() throws HabitCompletionServiceException;
    List<HabitCompletionDto> getTodayHabitsStatus() throws HabitCompletionServiceException;
    HabitCompletion updateHabitCompletionStatus(Long id, Boolean completed) throws HabitCompletionServiceException, HabitCompletionDataException;
}
