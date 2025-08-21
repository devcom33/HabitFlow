package org.heymouad.focusapp.services.servicesImpl;

import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.heymouad.focusapp.services.HabitCompletionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class HabitCompletionServiceImplTest {
    @Mock
    private HabitCompletionRepository habitCompletionRepository;

    @InjectMocks
    private HabitCompletionServiceImpl habitCompletionService;

    @Test
    void saveHabitCompletion() {
    }

    @Test
    void updateHabitCompletionStatus() {
    }

    @Test
    void getAllHabitsStatus() {
    }

    @Test
    void getTodayHabitsStatus() {
    }

    @Test
    void resetDailyHabits() {
    }
}