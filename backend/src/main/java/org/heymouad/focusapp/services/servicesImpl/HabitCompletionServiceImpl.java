package org.heymouad.focusapp.services.servicesImpl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.dtos.HabitCompletionDto;
import org.heymouad.focusapp.dtos.HabitDto;
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
            habitCompletion.setCompleted(completed);
        else
            return null;

        return habitCompletionRepository.save(habitCompletion);
    }

    @Override
    public List<HabitCompletionDto> getAllHabitsStatus()
    {
        return habitCompletionRepository.findAll().stream()
                .map(hc -> new HabitCompletionDto(
                        hc.getId(),
                        hc.isCompleted(),
                        hc.getCompletionDate(),
                        new HabitDto(hc.getHabit().getId(), hc.getHabit().getName())
                ))
                .toList();
    }

    @Override
    public List<HabitCompletionDto> getTodayHabitsStatus()
    {
        return habitCompletionRepository.findHabitCompletionByCompletionDate(LocalDate.now())
                .stream()
                .map(ths -> new HabitCompletionDto(
                        ths.getId(),
                        ths.isCompleted(),
                        ths.getCompletionDate(),
                        new HabitDto(ths.getHabit().getId(), ths.getHabit().getName())
                ))
                .toList();
    }

    @Scheduled(cron = "0 18 1 * * *")
    public void resetDailyHabits() {
        log.info("Running daily habit reset...");
        List<Habit> habits = habitService.getAllHabit();
        habits.forEach(habit -> {
            boolean exists = habitCompletionRepository.existsByHabitAndCompletionDate(habit, LocalDate.now());
            if (!exists) {
                HabitCompletion habitCompletion = new HabitCompletion();
                habitCompletion.setHabit(habit);
                habitCompletion.setCompletionDate(LocalDate.now());
                habitCompletion.setCompleted(false);
                saveHabitCompletion(habitCompletion);
            }
        });
    }
}
