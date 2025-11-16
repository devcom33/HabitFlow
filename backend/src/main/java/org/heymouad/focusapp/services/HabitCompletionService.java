package org.heymouad.focusapp.services;

import org.heymouad.focusapp.dtos.HabitCompletionDto;
import org.heymouad.focusapp.entities.AppUser;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.exceptions.HabitCompletionDataException;
import org.heymouad.focusapp.exceptions.HabitCompletionServiceException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HabitCompletionService {
    HabitCompletion saveHabitCompletion(HabitCompletion habitCompletion, AppUser appUser) throws HabitCompletionServiceException;
    List<HabitCompletionDto> getAllHabitsStatus();
    List<HabitCompletionDto> getTodayHabitsStatus(AppUser appUser);
    HabitCompletion updateHabitCompletionStatus(Long id, Boolean completed);
    List<HabitCompletionDto> getHabitsCompletionByHabitId(Long habitId, AppUser appUser);
    Page<HabitCompletion> getHabitsCompletionByCategory(String categoryName, AppUser appUser, Pageable pageable);
}
