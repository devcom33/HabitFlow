package org.heymouad.focusapp.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.dtos.HabitDto;
import org.heymouad.focusapp.dtos.HabitUpdateRequest;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.entities.HabitCompletion;
import org.heymouad.focusapp.mappers.HabitMapper;
import org.heymouad.focusapp.repositories.HabitRepository;
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
public class HabitController {
    private final HabitService habitService;
    private final HabitCompletionService habitCompletionService;
    private final HabitMapper habitMapper;

    @PostMapping("/addHabit")
    public ResponseEntity<Habit> saveHabit(@RequestBody HabitDto habitRequestDto)
    {
        Habit savedHabit = habitService.saveHabit(habitMapper.toHabit(habitRequestDto));

        return ResponseEntity.ok(savedHabit);
    }

    @GetMapping("/getHabits")
    public ResponseEntity<List<Habit>> getAllHabits()
    {
        List<Habit> habitList = habitService.getAllHabit();

        return ResponseEntity.ok(habitList);
    }

}