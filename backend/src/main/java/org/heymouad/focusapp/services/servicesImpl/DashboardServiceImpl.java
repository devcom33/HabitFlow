package org.heymouad.focusapp.services.servicesImpl;

import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.dtos.HabitCompletionCountDTO;
import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.heymouad.focusapp.services.DashboardService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final HabitCompletionRepository habitCompletionRepository;

    @Override
    public List<HabitCompletionCountDTO> getLast7DaysCompletions() {
        LocalDate startDate = LocalDate.now().minusDays(7);
        return habitCompletionRepository.findRecentHabitCompletionCounts(startDate);
    }

}
