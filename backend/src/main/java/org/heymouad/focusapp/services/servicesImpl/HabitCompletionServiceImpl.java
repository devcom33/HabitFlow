package org.heymouad.focusapp.services.servicesImpl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.heymouad.focusapp.services.HabitCompletionService;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
@AllArgsConstructor
@Slf4j
public class HabitCompletionServiceImpl implements HabitCompletionService {
    private final HabitCompletionRepository habitCompletionRepository;
    private final HabitService habitService;

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

    public List<HabitCompletion> getAllHabitsStatus()
    {
        return habitCompletionRepository.findAll();
    }

    public List<HabitCompletion> getTodayHabitsStatus()
    {
        return habitCompletionRepository.findHabitCompletionByCompletionDate(LocalDate.now());
    }

    @Scheduled(cron = "0 25 19 * * *")
    public void resetDailyHabits() {
        log.info("Running daily habit reset...");
        HabitCompletion habitCompletion = new HabitCompletion();
        List<Habit> habits = habitService.getAllHabit();
        habits.forEach(habit -> {
            habitCompletion.setHabit(habit);
            habitCompletion.setCompletionDate(LocalDate.now());
            habitCompletion.setCompleted(false);
            saveHabitCompletion(habitCompletion);
        });
    }
}
