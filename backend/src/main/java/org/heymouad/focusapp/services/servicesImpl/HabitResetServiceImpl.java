package org.heymouad.focusapp.services.servicesImpl;

import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.heymouad.focusapp.services.HabitResetService;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
class HabitResetServiceImpl implements HabitResetService {
    private final HabitService habitService;
    private final HabitCompletionRepository habitCompletionRepository;


    @Override
    public void resetDailyHabits(LocalDate date) {
        List<Habit> habitList = habitService.getAllHabits();

        for (Habit habit : habitList) {
            try {
                boolean exists = habitCompletionRepository.existsByHabitAndCompletionDate(habit, date);

                if (!exists) {
                    HabitCompletion completion = new HabitCompletion();
                    completion.setHabit(habit);
                    completion.setCompletionDate(date);
                    completion.setCompleted(false);

                    habitCompletionRepository.save(completion);
                }
            } catch (Exception e) {
            }
        }

    }

}
