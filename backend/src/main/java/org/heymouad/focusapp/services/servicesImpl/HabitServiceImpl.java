package org.heymouad.focusapp.services.servicesImpl;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.repositories.HabitRepository;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class HabitServiceImpl implements HabitService {
    private final HabitRepository habitRepository;

    @Override
    @Transactional
    public Habit saveHabit(Habit habit) {
        return habitRepository.save(habit);
    }

    @Override
    public List<Habit> getAllHabits() {
        return habitRepository.findAll();
    }

    @Override
    public Optional<Habit> getById(Long habitId) {
        return habitRepository.findById(habitId);
    }

}