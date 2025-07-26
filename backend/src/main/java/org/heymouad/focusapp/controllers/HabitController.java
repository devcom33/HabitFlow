package org.heymouad.focusapp.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.dtos.HabitDto;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.mappers.HabitMapper;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
@Slf4j
public class HabitController {
    private final HabitService habitService;
    private final HabitMapper habitMapper;

    @PostMapping("/addHabit")
    public ResponseEntity<Habit> saveHabit(@RequestBody HabitDto habitRequestDto)
    {
        Habit habit = habitMapper.toHabit(habitRequestDto);
        Habit savedActivity = habitService.saveHabit(habit);

        return ResponseEntity.ok(savedActivity);
    }

    @GetMapping("/getHabits")
    public ResponseEntity<List<HabitDto>> getAllHabits()
    {
        List<HabitDto> habitList = habitService.getAllHabit()
                .stream()
                .map(habitMapper::toHabitDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(habitList);
    }
}