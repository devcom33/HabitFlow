package org.heymouad.focusapp.services;

import org.heymouad.focusapp.dtos.HabitCompletionCountDTO;

import java.util.List;

public interface DashboardService {
    List<HabitCompletionCountDTO> getLast7DaysCompletions();
    double completionRate();
}
