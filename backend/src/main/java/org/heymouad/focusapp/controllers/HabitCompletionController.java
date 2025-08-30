package org.heymouad.focusapp.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.dtos.HabitCompletionDto;
import org.heymouad.focusapp.dtos.HabitUpdateRequest;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.exceptions.HabitCompletionDataException;
import org.heymouad.focusapp.exceptions.HabitCompletionServiceException;
import org.heymouad.focusapp.exceptions.HabitServiceException;
import org.heymouad.focusapp.mappers.HabitCompletionMapper;
import org.heymouad.focusapp.services.HabitCompletionService;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
@Slf4j
public class HabitCompletionController {
    private final HabitCompletionService habitCompletionService;
    private final HabitService habitService;
    private final HabitCompletionMapper habitCompletionMapper;

    @PostMapping("/habits/{habitId}/completions")
    public ResponseEntity<HabitCompletion> saveHabitCompletion(
            @PathVariable Long habitId
    ) throws HabitServiceException, HabitCompletionServiceException {
        Habit habit = habitService.getById(habitId)
                .orElseThrow(() -> new RuntimeException("Habit not found"));

        HabitCompletion habitCompletion = HabitCompletion.builder()
                .habit(habit)
                .completed(false)
                .completionDate(LocalDate.now())
                .build();

        HabitCompletion savedHabitCompletion = habitCompletionService.saveHabitCompletion(habitCompletion);
        return ResponseEntity.ok(savedHabitCompletion);
    }


    @GetMapping("/HabitsCompletion")
    public ResponseEntity<List<HabitCompletionDto>> getHabitsCompletion() throws HabitCompletionServiceException {
        return ResponseEntity.ok(habitCompletionService.getAllHabitsStatus());
    }

    @GetMapping("/HabitsCompletion/today")
    public ResponseEntity<List<HabitCompletionDto>> getHabitsCompletionStatus() throws HabitCompletionServiceException {
        return ResponseEntity.ok(habitCompletionService.getTodayHabitsStatus());
    }
    /*
        getHabitsCompletionByHabitId - get completed habits by habit Id
     */
    @GetMapping("/habits/{habitId}/completions")
    public ResponseEntity<List<HabitCompletionDto>> getHabitsCompletionByHabitId(@PathVariable Long habitId) throws HabitCompletionServiceException {
        return ResponseEntity.ok(habitCompletionService.getHabitsCompletionByHabitId(habitId));
    }

    @PatchMapping("/completions/{id}")
    public ResponseEntity<HabitCompletionDto> updateHabit(@PathVariable Long id, @RequestBody HabitUpdateRequest habitUpdateRequest) throws HabitCompletionServiceException, HabitCompletionDataException {
        HabitCompletion updatedHabitCompletion = habitCompletionService.updateHabitCompletionStatus(id, habitUpdateRequest.completed());
        HabitCompletionDto habitCompletionDto = habitCompletionMapper.toHabitCompletionDto(updatedHabitCompletion);
        return ResponseEntity.ok(habitCompletionDto);
    }
}
