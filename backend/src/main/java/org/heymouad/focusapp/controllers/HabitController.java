package org.heymouad.focusapp.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.dtos.HabitDto;
import org.heymouad.focusapp.dtos.HabitResponse;
import org.heymouad.focusapp.entities.AppUser;
import org.heymouad.focusapp.entities.Habit;
import org.heymouad.focusapp.exceptions.HabitServiceException;
import org.heymouad.focusapp.mappers.HabitMapper;
import org.heymouad.focusapp.services.AppUserService;
import org.heymouad.focusapp.services.HabitService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
@Slf4j
public class HabitController {
    private final HabitService habitService;
    private final AppUserService appUserService;
    private final HabitMapper habitMapper;

    @PostMapping("/addHabit")
    public ResponseEntity<HabitResponse> saveHabit(@RequestBody HabitDto habitRequestDto, Authentication authentication) throws HabitServiceException {
        String email = authentication.getName();
        AppUser appUser = appUserService.getUserByEmail(email);
        Habit savedHabit = habitService.saveHabit(habitMapper.toHabit(habitRequestDto), appUser);
        HabitResponse habitResponse = habitMapper.toHabitResponse(savedHabit);

        return ResponseEntity.ok(habitResponse);
    }

    
    @GetMapping("/getHabits")
    public ResponseEntity<List<HabitResponse>> getAllHabits() throws HabitServiceException {
        List<Habit> habitList = habitService.getAllHabits();
        List<HabitResponse> habitResponses = habitList.stream().map(habitMapper::toHabitResponse).toList();

        return ResponseEntity.ok(habitResponses);
    }

}