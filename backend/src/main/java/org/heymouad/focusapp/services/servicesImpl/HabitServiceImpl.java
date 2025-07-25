package org.heymouad.focusapp.services.servicesImpl;

import lombok.AllArgsConstructor;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.repositories.HabitRepository;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class HabitServiceImpl implements HabitService {
    private final HabitRepository habitRepository;

    @Override
    public Habit saveHabit(Habit habit) {
        return habitRepository.save(habit);
    }
}
