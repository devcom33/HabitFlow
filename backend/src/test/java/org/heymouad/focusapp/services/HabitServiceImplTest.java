package org.heymouad.focusapp.services;

import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.exceptions.HabitServiceException;
import org.heymouad.focusapp.repositories.HabitRepository;
import org.heymouad.focusapp.services.servicesImpl.HabitServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HabitServiceImplTest {

    @Mock
    private HabitRepository habitRepository;

    @InjectMocks
    private HabitServiceImpl habitService;

    private Habit validHabit, anotherHabit;

    @BeforeEach
    void setUp() {
        validHabit = createHabit(1L, "Exercise");
        anotherHabit = createHabit(2L, "Read");
    }

    Habit createHabit(Long id, String name)
    {
        Habit habit = new Habit();
        habit.setId(id);
        habit.setName(name);

        return habit;
    }
    // ---------- saveHabit Tests ----------

    @Test
    @DisplayName("Should save habit successfully")
    void shouldSaveHabitSuccessfully() throws HabitServiceException {
        when(habitRepository.save(validHabit)).thenReturn(validHabit);

        Habit savedHabit = habitService.saveHabit(validHabit);

        assertThat(savedHabit)
                .isNotNull()
                        .extracting(Habit::getId, Habit::getName)
                                .containsExactly(1L, "Exercise");

        verify(habitRepository, times(1)).save(validHabit);
    }

    @Test
    @DisplayName("Should throw HabitServiceException when repository fails")
    void shouldThrowHabitServiceExceptionWhenRepositoryFails() {
        when(habitRepository.save(any(Habit.class)))
                .thenThrow(new DataAccessException("Database connection failed") {});

        assertThatThrownBy(() -> habitService.saveHabit(validHabit))
                .isInstanceOf(HabitServiceException.class)
                .hasMessage("Failed to save Habit")
                .hasCauseInstanceOf(DataAccessException.class);

        verify(habitRepository).save(validHabit);
    }

    @Test
    @DisplayName("Should throw IllegalArgumentException when habit is null")
    void shouldThrowIllegalArgumentExceptionWhenHabitIsNull() throws HabitServiceException {
        assertThatThrownBy(() -> habitService.saveHabit(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Habit cannot be null");

        verify(habitRepository, never()).save(any());
    }

    @ParameterizedTest
    @DisplayName("Should reject invalid habits")
    @MethodSource("invalidHabits")
    void shouldRejectInvalidHabits(Habit invalidHabit, String testCase) {
        // When & Then
        assertThatThrownBy(() -> habitService.saveHabit(invalidHabit))
                .isInstanceOf(IllegalArgumentException.class)
                .withFailMessage("Failed for test case: " + testCase);
    }

    static Stream<Arguments> invalidHabits() {
        return Stream.of(
                Arguments.of(null, "null habit")
        );
    }

    //Test getAllHabits
    @Test
    @DisplayName("Should return all habits when data exists")
    void shouldReturnAllHabits() throws HabitServiceException {
        List<Habit> expectedHabits = Arrays.asList(validHabit, anotherHabit);
        when(habitRepository.findAll()).thenReturn(expectedHabits);

        List<Habit> actualHabits = habitService.getAllHabits();

        assertThat(actualHabits)
                .isNotNull()
                .hasSize(2)
                .extracting(Habit::getName)
                .containsExactly("Exercise", "Read");

        verify(habitRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("should throw HabitServiceException when habitRepository failed")
    void shouldThrowHabitServiceExceptionWhenGetAllHabitsFails() throws HabitServiceException{
        when(habitRepository.findAll())
                .thenThrow(new DataAccessException("Database connection failed") {});

        assertThatThrownBy(() -> habitService.getAllHabits())
                .isInstanceOf(HabitServiceException.class)
                .hasMessage("Failed to retrieve habits")
                .hasCauseInstanceOf(DataAccessException.class);

        verify(habitRepository).findAll();
    }

    @Test
    @DisplayName("should return Habit when found valid Id successfully")
    void shouldGetHabitIdSuccessfully() throws HabitServiceException{
        Long validId = 1L;
        when(habitRepository.findById(validId)).thenReturn(Optional.of(validHabit));

        Optional<Habit> result = habitService.getById(validId);

        assertThat(result)
                .isPresent()
                .get()
                .extracting(Habit::getName)
                .isEqualTo("Exercise");

        verify(habitRepository, times(1)).findById(validId);
    }

    @ParameterizedTest
    @DisplayName("should throw IllegalArgumentException for invalid Ids")
    @ValueSource(longs = {0L, -1L, -100L})
    @NullSource
    void shouldThrowExceptionForInvalidIds(Long invalidId)
    {
        assertThatThrownBy(() -> habitService.getById(invalidId))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Habit ID must be a positive number");

        verify(habitRepository, never()).findById(any());
    }
}