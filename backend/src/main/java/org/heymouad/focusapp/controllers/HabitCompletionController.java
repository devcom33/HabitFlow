package org.heymouad.focusapp.controllers;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.dtos.HabitUpdateRequest;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.services.HabitCompletionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
@Slf4j
public class HabitCompletionController {
    private final HabitCompletionService habitCompletionService;

    @PatchMapping("/updateHabit/{id}")
    public ResponseEntity<HabitCompletion> updateHabit(@PathVariable Long id, @RequestBody HabitUpdateRequest habitUpdateRequest)
    {
        log.warn("habit completion status : {}", habitUpdateRequest);
        HabitCompletion updatedHabit = habitCompletionService.updateHabitCompletionStatus(id, habitUpdateRequest.completed());
        return ResponseEntity.ok(updatedHabit);
    }
}
