package org.heymouad.focusapp.services.servicesImpl;

import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.exceptions.HabitCompletionDataException;
import org.heymouad.focusapp.exceptions.HabitCompletionNotFoundException;
import org.heymouad.focusapp.exceptions.HabitCompletionServiceException;
import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessException;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HabitCompletionServiceImplTest {
    @Mock
    private HabitCompletionRepository habitCompletionRepository;

    @InjectMocks
    private HabitCompletionServiceImpl habitCompletionService;
    private HabitCompletion validHabitCompletion, anotherHabitCompletion;
    private Habit validHabit, anotherHabit;

    @BeforeEach
    void setUp()
    {
        validHabit = createHabit(1L, "Exercise");
        anotherHabit = createHabit(2L, "Read");
        validHabitCompletion = createHabitCompletion(1L, validHabit, true, LocalDate.now());
        anotherHabitCompletion = createHabitCompletion(2L, anotherHabit, false, LocalDate.now().minusDays(1));
    }

    HabitCompletion createHabitCompletion(Long id, Habit habit, boolean completed, LocalDate completionDate)
    {
        HabitCompletion habitCompletion = new HabitCompletion();
        habitCompletion.setId(id);
        habitCompletion.setHabit(habit);
        habitCompletion.setCompleted(completed);
        habitCompletion.setCompletionDate(completionDate);

        return habitCompletion;
    }

    Habit createHabit(Long id, String name)
    {
        Habit habit = new Habit();
        habit.setId(id);
        habit.setName(name);

        return habit;
    }

    @Test
    @DisplayName("Should Save HabitCompletion sucessfully")
    void shouldSaveHabitSuccessfully() {
        when(habitCompletionRepository.save(validHabitCompletion)).thenReturn(validHabitCompletion);

        HabitCompletion savedHabitCompletion = habitCompletionService.saveHabitCompletion(validHabitCompletion);

        assertThat(savedHabitCompletion)
                .isNotNull()
                .extracting(HabitCompletion::getId, HabitCompletion::getHabit, HabitCompletion::isCompleted)
                .containsExactly(1L, validHabit, true);

        verify(habitCompletionRepository, times(1)).save(validHabitCompletion);
    }

    @Test
    @DisplayName("should throws IllegalArgumentException")
    void shouldTrowsIllegalArgumentExceptionWhenHabitCompletionNull() {
        assertThatThrownBy(() -> habitCompletionService.saveHabitCompletion(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("HabitCompletion cannot be null");

        verify(habitCompletionRepository, never()).save(any());
    }

    @Test
    @DisplayName("should throw HabitCompletionServiceException when repository fails")
    void shouldThrowHabitCompletionServiceExceptionWhenRepositiryFails() {
        when(habitCompletionRepository.save(any(HabitCompletion.class)))
                .thenThrow(new DataAccessException("Database connection failed") {});

        assertThatThrownBy(() -> habitCompletionService.saveHabitCompletion(validHabitCompletion))
                .isInstanceOf(HabitCompletionServiceException.class)
                .hasMessage("Failed to save HabitCompletion")
                .hasCauseInstanceOf(DataAccessException.class);

        verify(habitCompletionRepository).save(validHabitCompletion);
    }

    //---------------------- updateHabitCompletionStatus --------------------------------

    @ParameterizedTest
    @DisplayName("should throw IllegalArgumentException when habitCompletionId is invalid")
    @ValueSource(longs = {0L, -1L, -100L})
    void shouldThrowIllegalArgumentExceptionWhenIdInvalid(Long invalidHabitCompletedId) {
        assertThatThrownBy(() -> habitCompletionService.updateHabitCompletionStatus(invalidHabitCompletedId, true))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("HabitCompletion Id must be a positive number");

        verify(habitCompletionRepository, never()).findById(invalidHabitCompletedId);
    }

    @Test
    void shouldThrowHabitCompletionNotFoundException() {
        Long invalidId = 100L;
        //when
        when(habitCompletionRepository.findById(invalidId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> habitCompletionService.updateHabitCompletionStatus(invalidId, true))
                .isInstanceOf(HabitCompletionDataException.class)
                .hasMessage("Failed to update habit completion status");

        verify(habitCompletionRepository).findById(invalidId);
    }
}