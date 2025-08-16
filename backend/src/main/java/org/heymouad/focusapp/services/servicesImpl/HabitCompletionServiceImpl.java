package org.heymouad.focusapp.services.servicesImpl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.heymouad.focusapp.services.HabitCompletionService;
import org.springframework.stereotype.Service;



@Service
@AllArgsConstructor
@Slf4j
public class HabitCompletionServiceImpl implements HabitCompletionService {
    private final HabitCompletionRepository habitCompletionRepository;

    @Override
    public HabitCompletion saveHabitCompletion(HabitCompletion habitCompletion) {
        return habitCompletionRepository.save(habitCompletion);
    }

    @Override
    public HabitCompletion updateHabitCompletionStatus(Long habitCompletionId, Boolean completed) {
        HabitCompletion habitCompletion = habitCompletionRepository.findById(habitCompletionId)
                .orElseThrow(() -> new EntityNotFoundException("HabitCompletion not found with id: " + habitCompletionId));

        if (habitCompletion != null)
            habitCompletion.setCompleted(!completed);
        else
            return habitCompletion;

        return habitCompletionRepository.save(habitCompletion);
    }
}
