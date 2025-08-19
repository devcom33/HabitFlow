package org.heymouad.focusapp.services;

import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.exceptions.HabitServiceException;
import org.heymouad.focusapp.repositories.HabitRepository;
import org.heymouad.focusapp.services.servicesImpl.HabitServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessException;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HabitServiceImplTest {

    @Mock
    private HabitRepository habitRepository;

    @InjectMocks
    private HabitServiceImpl habitService;

    private Habit sampleHabit;

    @BeforeEach
    void setUp() {
        sampleHabit = new Habit();
        sampleHabit.setId(1L);
        sampleHabit.setName("Exercise");
    }

    // ---------- saveHabit Tests ----------

    @Test
    @DisplayName("Should save habit successfully")
    void shouldSaveHabitSuccessfully() throws HabitServiceException {
        when(habitRepository.save(sampleHabit)).thenReturn(sampleHabit);

        Habit savedHabit = habitService.saveHabit(sampleHabit);

        assertNotNull(savedHabit);
        assertEquals(1L, savedHabit.getId());
        assertEquals("Exercise", savedHabit.getName());
        verify(habitRepository, times(1)).save(sampleHabit);
    }

    @Test
    @DisplayName("Should throw exception when saveHabit fails")
    void shouldThrowExceptionWhenSaveFails() {
        when(habitRepository.save(any())).thenThrow(new DataAccessException("DB error") {});

        assertThrows(DataAccessException.class, () -> habitService.saveHabit(sampleHabit));
        verify(habitRepository).save(sampleHabit);
    }

    @Test
    @DisplayName("Should save null habit gracefully (if allowed by repo)")
    void shouldSaveNullHabitGracefully() throws HabitServiceException {
        when(habitRepository.save(null)).thenReturn(null);

        Habit result = habitService.saveHabit(null);

        assertNull(result);
        verify(habitRepository).save(null);
    }

    // ---------- getAllHabit Tests ----------

    @Test
    @DisplayName("Should return all habits when data exists")
    void shouldReturnAllHabits() throws HabitServiceException {
        Habit anotherHabit = new Habit();
        anotherHabit.setId(2L);
        anotherHabit.setName("Read");

        List<Habit> mockHabits = Arrays.asList(sampleHabit, anotherHabit);
        when(habitRepository.findAll()).thenReturn(mockHabits);

        List<Habit> result = habitService.getAllHabits();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Exercise", result.get(0).getName());
        assertEquals("Read", result.get(1).getName());
        verify(habitRepository).findAll();
    }

    @Test
    @DisplayName("Should return empty list when no habits found")
    void shouldReturnEmptyListWhenNoHabitsExist() throws HabitServiceException {
        when(habitRepository.findAll()).thenReturn(Collections.emptyList());

        List<Habit> result = habitService.getAllHabits();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(habitRepository).findAll();
    }

    // ---------- getById Tests ----------

    @Test
    @DisplayName("Should return habit when found by ID")
    void shouldReturnHabitByIdWhenFound() throws HabitServiceException {
        when(habitRepository.findById(1L)).thenReturn(Optional.of(sampleHabit));

        Optional<Habit> result = habitService.getById(1L);

        assertTrue(result.isPresent());
        assertEquals("Exercise", result.get().getName());
        verify(habitRepository).findById(1L);
    }

    @Test
    @DisplayName("Should return empty optional when habit not found by ID")
    void shouldReturnEmptyWhenHabitNotFound() throws HabitServiceException {
        when(habitRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Habit> result = habitService.getById(99L);

        assertFalse(result.isPresent());
        verify(habitRepository).findById(99L);
    }

    @Test
    @DisplayName("Should handle null ID input gracefully in getById")
    void shouldHandleNullIdInGetById() throws HabitServiceException {
        when(habitRepository.findById(null)).thenReturn(Optional.empty());

        Optional<Habit> result = habitService.getById(null);

        assertFalse(result.isPresent());
        verify(habitRepository).findById(null);
    }
}