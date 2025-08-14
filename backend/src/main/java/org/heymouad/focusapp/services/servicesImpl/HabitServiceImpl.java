package org.heymouad.focusapp.services.servicesImpl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.repositories.HabitRepository;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class HabitServiceImpl implements HabitService {
    private final HabitRepository habitRepository;

    @Override
    public Habit saveHabit(Habit habit) {
        return habitRepository.save(habit);
    }

    @Override
    public List<Habit> getAllHabit() {
        return habitRepository.findAll();
    }

    /*
    @Scheduled(cron = "0 0 0 * * *")
    public void resetDailyHabits() {
        log.info("Running daily habit reset...");
        List<Habit> habits = getAllHabit();
        habits.forEach(habit -> {
            if (habit.isCompleted())
            {
                habit.setCompleted(false);
                habitRepository.save(habit);
            }
        });
    }
     */
}