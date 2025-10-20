package org.heymouad.focusapp.services.servicesImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.entities.AppUser;
import org.heymouad.focusapp.entities.Category;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.exceptions.HabitServiceException;
import org.heymouad.focusapp.repositories.CategoryRepository;
import org.heymouad.focusapp.repositories.HabitRepository;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class HabitServiceImpl implements HabitService {
    private final HabitRepository habitRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public Habit saveHabit(Habit habit, AppUser appUser) throws HabitServiceException {
        log.warn("starting : ");
        if (habit == null) {
            throw new IllegalArgumentException("Habit cannot be null");
        }
        if (appUser == null) {
            throw new IllegalArgumentException("AppUser cannot be null");
        }
        try {
            habit.setAppUser(appUser);

            if (habit.getCategory() != null && habit.getCategory().getName() != null) {
                Category existingCategory = categoryRepository
                        .findByName(habit.getCategory().getName())
                        .orElseThrow(() -> new IllegalArgumentException("Category not found"));
                habit.setCategory(existingCategory);
            }
            Habit savedHabit = habitRepository.save(habit);
            return savedHabit;
        } catch (DataAccessException e)
        {
            throw new HabitServiceException("Failed to save Habit", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Habit> getAllHabits() throws HabitServiceException {
        try{
            List<Habit> habits = habitRepository.findAll();

            return habits;
        } catch (DataAccessException e) {
            throw new HabitServiceException("Failed to retrieve habits", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Habit> getById(Long habitId) throws HabitServiceException {
        if (habitId == null || habitId <= 0)
        {
            throw new IllegalArgumentException("Habit ID must be a positive number");
        }
        try {
            Optional<Habit> habit = habitRepository.findById(habitId);

            return habit;
        } catch (DataAccessException e) {
            throw new HabitServiceException("Failed to retrieve habit", e);
        }
    }

}