package org.heymouad.focusapp.services.servicesImpl;

import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.heymouad.focusapp.services.DashboardService;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final HabitCompletionRepository habitCompletionRepository;

}
