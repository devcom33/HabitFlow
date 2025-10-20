package org.heymouad.focusapp.services.servicesImpl;

import org.heymouad.focusapp.dtos.HabitCompletionDto;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.exceptions.HabitCompletionDataException;
import org.heymouad.focusapp.exceptions.HabitCompletionServiceException;
import org.heymouad.focusapp.mappers.CategoryMapper;
import org.heymouad.focusapp.repositories.HabitCompletionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessException;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HabitCompletionServiceImplTest {

    @Mock
    private HabitCompletionRepository habitCompletionRepository;

    @Mock
    private CategoryMapper categoryMapper;

    @InjectMocks
    private HabitCompletionServiceImpl habitCompletionService;

    private HabitCompletion validHabitCompletion, anotherHabitCompletion;
    private Habit validHabit;

    @BeforeEach
    void setUp() {
        validHabit = createHabit(1L, "Exercise");
        Habit anotherHabit = createHabit(2L, "Read");
        validHabitCompletion = createHabitCompletion(1L, validHabit, true);
        anotherHabitCompletion = createHabitCompletion(2L, anotherHabit, false);
    }

    private HabitCompletion createHabitCompletion(Long id, Habit habit, boolean completed) {
        HabitCompletion habitCompletion = new HabitCompletion();
        habitCompletion.setId(id);
        habitCompletion.setHabit(habit);
        habitCompletion.setCompleted(completed);
        habitCompletion.setCompletionDate(LocalDate.now());
        return habitCompletion;
    }

    private Habit createHabit(Long id, String name) {
        Habit habit = new Habit();
        habit.setId(id);
        habit.setName(name);
        return habit;
    }

    //-------------------- saveHabitCompletion --------------------

    @Test
    void shouldSaveHabitSuccessfully() {
        when(habitCompletionRepository.save(validHabitCompletion)).thenReturn(validHabitCompletion);

        HabitCompletion saved = habitCompletionService.saveHabitCompletion(validHabitCompletion);

        assertThat(saved)
                .isNotNull()
                .extracting(HabitCompletion::getId, HabitCompletion::getHabit, HabitCompletion::isCompleted)
                .containsExactly(1L, validHabit, true);

        verify(habitCompletionRepository).save(validHabitCompletion);
    }

    @Test
    void shouldThrowIllegalArgumentExceptionWhenHabitCompletionNull() {
        assertThatThrownBy(() -> habitCompletionService.saveHabitCompletion(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("HabitCompletion cannot be null");

        verify(habitCompletionRepository, never()).save(any());
    }

    @Test
    void shouldThrowHabitCompletionServiceExceptionWhenRepositoryFails() {
        when(habitCompletionRepository.save(any(HabitCompletion.class)))
                .thenThrow(new DataAccessException("DB failed") {});

        assertThatThrownBy(() -> habitCompletionService.saveHabitCompletion(validHabitCompletion))
                .isInstanceOf(HabitCompletionServiceException.class)
                .hasCauseInstanceOf(DataAccessException.class)
                .hasMessage("Failed to save HabitCompletion");

        verify(habitCompletionRepository).save(validHabitCompletion);
    }

    //-------------------- updateHabitCompletionStatus --------------------

    @ParameterizedTest
    @ValueSource(longs = {0L, -1L, -100L})
    @NullSource
    void shouldThrowIllegalArgumentExceptionWhenIdInvalid(Long id) {
        assertThatThrownBy(() -> habitCompletionService.updateHabitCompletionStatus(id, true))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("HabitCompletion Id must be a positive number");

        verify(habitCompletionRepository, never()).findById(any());
    }

    @Test
    void shouldThrowHabitCompletionNotFoundException() {
        Long id = 100L;
        when(habitCompletionRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> habitCompletionService.updateHabitCompletionStatus(id, true))
                .isInstanceOf(HabitCompletionDataException.class)
                .hasMessage("Failed to update habit completion status");

        verify(habitCompletionRepository).findById(id);
    }

    @Test
    void shouldUpdateCompleted() {
        Long id = 1L;
        boolean newStatus = false;
        HabitCompletion updated = createHabitCompletion(id, validHabit, newStatus);

        when(habitCompletionRepository.findById(id)).thenReturn(Optional.of(validHabitCompletion));
        when(habitCompletionRepository.save(validHabitCompletion)).thenReturn(updated);

        HabitCompletion result = habitCompletionService.updateHabitCompletionStatus(id, newStatus);

        assertThat(result)
                .extracting(HabitCompletion::getId, HabitCompletion::getHabit, HabitCompletion::isCompleted)
                .containsExactly(id, validHabit, false);

        verify(habitCompletionRepository).findById(id);
        verify(habitCompletionRepository).save(validHabitCompletion);
    }

    @Test
    void shouldReturnSameHabitCompletionWhenNoChangeNeeded() {
        Long id = 1L;
        boolean status = true;
        HabitCompletion existing = createHabitCompletion(id, validHabit, status);

        when(habitCompletionRepository.findById(id)).thenReturn(Optional.of(existing));

        HabitCompletion result = habitCompletionService.updateHabitCompletionStatus(id, status);

        assertThat(result).isSameAs(existing);

        verify(habitCompletionRepository).findById(id);
        verify(habitCompletionRepository, never()).save(any());
    }

    //-------------------- getAllHabitsStatus --------------------

    @Test
    void shouldReturnAllHabitCompletionStatus() {
        when(categoryMapper.toCategoryRequest(any())).thenReturn(null);
        when(habitCompletionRepository.findAll()).thenReturn(List.of(validHabitCompletion, anotherHabitCompletion));

        List<HabitCompletionDto> result = habitCompletionService.getAllHabitsStatus();

        assertThat(result).hasSize(2)
                .extracting(HabitCompletionDto::completed)
                .containsExactly(true, false);

        verify(habitCompletionRepository).findAll();
    }

    @Test
    void shouldThrowHabitCompletionServiceException() {
        when(habitCompletionRepository.findAll()).thenThrow(new DataAccessException("DB failed") {});

        assertThatThrownBy(() -> habitCompletionService.getAllHabitsStatus())
                .isInstanceOf(HabitCompletionServiceException.class)
                .hasMessageContaining("Failed to retrieve completion habits");

        verify(habitCompletionRepository).findAll();
    }

    //-------------------- getTodayHabitsStatus --------------------

    @Test
    void shouldReturnAllTodayHabitsStatus() {
        LocalDate today = LocalDate.now();
        validHabitCompletion.setCompletionDate(today);
        anotherHabitCompletion.setCompletionDate(today);

        when(categoryMapper.toCategoryRequest(any())).thenReturn(null);
        when(habitCompletionRepository.findHabitCompletionByCompletionDate(today))
                .thenReturn(List.of(validHabitCompletion, anotherHabitCompletion));

        List<HabitCompletionDto> result = habitCompletionService.getTodayHabitsStatus();

        assertThat(result).hasSize(2)
                .extracting(HabitCompletionDto::completionDate)
                .containsExactly(today, today);

        verify(habitCompletionRepository).findHabitCompletionByCompletionDate(today);
    }

    @Test
    void shouldThrowHabitCompletionServiceExceptionWhenTodayStatusFails() {
        LocalDate today = LocalDate.now();
        when(habitCompletionRepository.findHabitCompletionByCompletionDate(today))
                .thenThrow(new DataAccessException("DB failed") {});

        assertThatThrownBy(() -> habitCompletionService.getTodayHabitsStatus())
                .isInstanceOf(HabitCompletionServiceException.class)
                .hasMessageContaining("Failed to retrieve today completion habits");

        verify(habitCompletionRepository).findHabitCompletionByCompletionDate(today);
    }


    //-------------resetDailyHabits---------------------------------------
    
}