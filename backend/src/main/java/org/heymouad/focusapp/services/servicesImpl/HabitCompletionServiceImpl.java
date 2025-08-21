package org.heymouad.focusapp.services.servicesImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.dtos.HabitCompletionDto;
import org.heymouad.focusapp.dtos.HabitDto;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.exceptions.HabitCompletionDataException;
import org.heymouad.focusapp.exceptions.HabitCompletionNotFoundException;
import org.heymouad.focusapp.exceptions.HabitCompletionServiceException;
import org.heymouad.focusapp.exceptions.HabitServiceException;
import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.heymouad.focusapp.services.HabitCompletionService;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.dao.DataAccessException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
@Slf4j
public class HabitCompletionServiceImpl implements HabitCompletionService {
    private final HabitCompletionRepository habitCompletionRepository;
    private final HabitService habitService;

    @Override
    @Transactional
    public HabitCompletion saveHabitCompletion(HabitCompletion habitCompletion) throws HabitCompletionServiceException {
        if (habitCompletion == null) {
            throw new IllegalArgumentException("HabitCompletion cannot be null");
        }
        try {
            return habitCompletionRepository.save(habitCompletion);
        } catch (DataAccessException e)
        {
            throw new HabitCompletionServiceException("Failed to save HabitCompletion", e);

        }
    }


    @Override
    @Transactional
    public HabitCompletion updateHabitCompletionStatus(Long habitCompletionId, Boolean completed) throws HabitCompletionDataException {
        if (habitCompletionId == null || habitCompletionId < 0) {
            throw new IllegalArgumentException("HabitCompletion Id must be a positive number");
        }
        try {
            log.debug("Updating habit completion status for ID: {}", habitCompletionId);

            HabitCompletion habitCompletion = habitCompletionRepository.findById(habitCompletionId)
                    .orElseThrow(() -> new HabitCompletionNotFoundException( String.format("Habit completion with ID %d not found", habitCompletionId)));

            if (!Objects.equals(habitCompletion.isCompleted(), completed)) {
                habitCompletion.setCompleted(completed);

                return habitCompletionRepository.save(habitCompletion);
            }

            return habitCompletion;
        } catch (HabitCompletionNotFoundException e) {

            throw new HabitCompletionDataException("Failed to update habit completion status", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<HabitCompletionDto> getAllHabitsStatus() throws HabitCompletionServiceException {
        try {

            return habitCompletionRepository.findAll().stream()
                    .map(hc -> new HabitCompletionDto(
                            hc.getId(),
                            hc.isCompleted(),
                            hc.getCompletionDate(),
                            new HabitDto(hc.getHabit().getId(), hc.getHabit().getName())
                    ))
                    .toList();
        } catch (DataAccessException e)
        {
            throw new HabitCompletionServiceException("Failed to retrieve completion habits", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<HabitCompletionDto> getTodayHabitsStatus() throws HabitCompletionServiceException {
        try {

            return habitCompletionRepository.findHabitCompletionByCompletionDate(LocalDate.now())
                    .stream()
                    .map(ths -> new HabitCompletionDto(
                            ths.getId(),
                            ths.isCompleted(),
                            ths.getCompletionDate(),
                            new HabitDto(ths.getHabit().getId(), ths.getHabit().getName())
                    ))
                    .toList();
        } catch (DataAccessException e)
        {
            throw new HabitCompletionServiceException("Failed to retrieve today completion habits", e);
        }
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void resetDailyHabits() throws HabitServiceException {
        log.info("Running daily habit reset...");
        List<Habit> habits = habitService.getAllHabits();
        habits.forEach(habit -> {
            boolean exists = habitCompletionRepository.existsByHabitAndCompletionDate(habit, LocalDate.now());
            if (!exists) {
                HabitCompletion habitCompletion = new HabitCompletion();
                habitCompletion.setHabit(habit);
                habitCompletion.setCompletionDate(LocalDate.now());
                habitCompletion.setCompleted(false);
                try {
                    saveHabitCompletion(habitCompletion);
                } catch (HabitCompletionServiceException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }
}
