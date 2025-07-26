package org.heymouad.focusapp.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.dtos.HabitDto;
import org.heymouad.focusapp.dtos.HabitUpdateRequest;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.mappers.HabitMapper;
import org.heymouad.focusapp.repositories.HabitRepository;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
@Slf4j
public class HabitController {
    private final HabitService habitService;
    private final HabitMapper habitMapper;
    private final HabitRepository habitRepository;

    @PostMapping("/addHabit")
    public ResponseEntity<Habit> saveHabit(@RequestBody HabitDto habitRequestDto)
    {
        Habit habit = habitMapper.toHabit(habitRequestDto);
        Habit savedActivity = habitService.saveHabit(habit);

        return ResponseEntity.ok(savedActivity);
    }

    @GetMapping("/getHabits")
    public ResponseEntity<List<Habit>> getAllHabits()
    {
        List<Habit> habitList = habitService.getAllHabit();

        return ResponseEntity.ok(habitList);
    }

    @PatchMapping("/updateHabit/{id}")
    public ResponseEntity<Habit> updateHabit(@PathVariable Long id, @RequestBody HabitUpdateRequest habitUpdateRequest)
    {
        Habit updatedHabit = habitService.updateHabit(id, habitUpdateRequest.completed());
        return ResponseEntity.ok(updatedHabit);
    }

}