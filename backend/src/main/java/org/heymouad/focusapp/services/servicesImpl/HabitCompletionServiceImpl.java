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
    private HabitCompletionRepository habitCompletionRepository;

    @Override
    public HabitCompletion saveHabitCompletion(HabitCompletion habitCompletion) {
        return habitCompletionRepository.save(habitCompletion);
    }


    public HabitCompletion updateHabitCompletionStatus(Long id, Boolean completed) {
        HabitCompletion habitCompletion = habitCompletionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Habit not found with id: " + id));

        if (completed != null) {
            habitCompletion.setCompleted(completed);
        }

        return habitCompletionRepository.save(habitCompletion);
    }
}
