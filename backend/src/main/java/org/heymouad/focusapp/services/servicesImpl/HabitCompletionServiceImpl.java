package org.heymouad.focusapp.services.servicesImpl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.heymouad.focusapp.repositories.HabitRepository;
import org.heymouad.focusapp.services.HabitCompletionService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;


@Service
@AllArgsConstructor
@Slf4j
public class HabitCompletionServiceImpl implements HabitCompletionService {
    private final HabitCompletionRepository habitCompletionRepository;
    private final HabitRepository habitRepository;

    @Override
    public HabitCompletion saveHabitCompletion(HabitCompletion habitCompletion) {
        return habitCompletionRepository.save(habitCompletion);
    }

    @Override
    public HabitCompletion updateHabitCompletionStatus(Long habitId, Boolean completed) {
        Habit habit = habitRepository.findById(habitId)
                .orElseThrow(() -> new EntityNotFoundException("Habit not found with id: " + habitId));

        HabitCompletion habitCompletion = habitCompletionRepository
                .findByHabitIdAndCompletionDate(habitId, LocalDate.now())
                .orElse(HabitCompletion.builder()
                        .habit(habit)
                        .completionDate(LocalDate.now())
                        .build());

        return habitCompletionRepository.save(habitCompletion);
    }
}
