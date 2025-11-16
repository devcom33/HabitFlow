package org.heymouad.focusapp.services;

import org.heymouad.focusapp.dtos.HabitCompletionCountDTO;
import org.heymouad.focusapp.entities.AppUser;

import java.util.List;

public interface DashboardService {
    List<HabitCompletionCountDTO> getLast7DaysCompletions(AppUser appUser);
    Object [] getCategoryStats(AppUser appUser);
    double completionRate(AppUser appUser);
}
