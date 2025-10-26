package org.heymouad.focusapp.schedulers;


import org.heymouad.focusapp.services.HabitResetService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class HabitResetScheduler {
    private final HabitResetService habitResetService;

    public HabitResetScheduler(HabitResetService habitResetService) {
        this.habitResetService = habitResetService;
    }

    @Scheduled(cron = "0 * * * * *")
    public void runDailyReset() {
        habitResetService.resetDailyHabits(LocalDate.now());
    }
}
