package org.heymouad.focusapp.controllers;


import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.dtos.HabitCompletionCountDTO;
import org.heymouad.focusapp.services.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequestMapping("/api/dashboard")
@RestController
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/last-7-days-completions")
    public ResponseEntity<List<HabitCompletionCountDTO>> getLast7DaysCompletions()
    {
        return ResponseEntity.ok(dashboardService.getLast7DaysCompletions());
    }
}
