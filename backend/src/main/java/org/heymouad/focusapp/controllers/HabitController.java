package org.heymouad.focusapp.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class HabitController {
    private final HabitService habitService;
    private final HabitMapper habitMapper;

    @PostMapping("/addHabit")
    public ResponseEntity<Habit> saveHabit(@RequestBody HabitRequestDto habitRequestDto)
    {
        log.error("[+] name : ", habitRequestDto.name());
        Habit habit = habitMapper.toHabit(habitRequestDto);
        log.error("[+] habit : ", habit.getName());
        Habit savedActivity = habitService.saveHabit(habit);

        return ResponseEntity.ok(savedActivity);
    }
}