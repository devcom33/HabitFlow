package org.heymouad.focusapp.services.servicesImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.heymouad.focusapp.repositories.HabitRepository;
import org.heymouad.focusapp.services.HabitResetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
class HabitResetServiceImpl implements HabitResetService {
    private final HabitCompletionRepository habitCompletionRepository;
    private final HabitRepository habitRepository;
    private static final int BATCH_SIZE = 9;

    @Transactional
    @Override
    public void resetDailyHabits(LocalDate date) {
        log.info("Resetting daily habits for date: {}", date);

        int page = 0;
        Page<Habit> habitsPage;

        do {
            habitsPage = habitRepository.findAll(PageRequest.of(page, BATCH_SIZE));

            List<HabitCompletion> newCompletions = new ArrayList<>();

            for (Habit habit : habitsPage.getContent()) {
                try {
                    boolean exists = habitCompletionRepository.existsByHabitAndCompletionDate(habit, date);

                    if (!exists) {
                        HabitCompletion completion = new HabitCompletion();
                        completion.setHabit(habit);
                        completion.setCompletionDate(date);
                        completion.setCompleted(false);
                        newCompletions.add(completion);
                    }

                } catch (Exception e) {
                    log.error("Failed to reset habit {} for date {}: {}", habit.getId(), date, e.getMessage(), e);
                }
            }

            if (!newCompletions.isEmpty()) {
                habitCompletionRepository.saveAll(newCompletions);
            }

            page++;
        } while (habitsPage.hasNext());
        log.info("Daily habit reset completed for date: {}", date);
    }

}
