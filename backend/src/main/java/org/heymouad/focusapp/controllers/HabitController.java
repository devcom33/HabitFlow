package org.heymouad.focusapp.controllers;

import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.dtos.HabitRequestDto;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.mappers.HabitMapper;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class HabitController {
    private final HabitService habitService;
    private final HabitMapper habitMapper;

    @PostMapping("/ActivityLog")
    public ResponseEntity<Habit> saveHabit(@RequestBody HabitRequestDto habitRequestDto)
    {
        Habit habit = habitMapper.toHabit(habitRequestDto);
        Habit savedActivity = habitService.saveHabit(habit);

        return ResponseEntity.ok(savedActivity);
    }
}