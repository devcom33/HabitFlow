package org.heymouad.focusapp.controllers;


import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.dtos.HabitCompletionCountDTO;
import org.heymouad.focusapp.entities.AppUser;
import org.heymouad.focusapp.services.AppUserService;
import org.heymouad.focusapp.services.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final AppUserService appUserService;

    @GetMapping("/last-7-days-completions")
    public ResponseEntity<List<HabitCompletionCountDTO>> getLast7DaysCompletions(Authentication authentication) {
        String email = authentication.getName();
        AppUser appUser = appUserService.getUserByEmail(email);
        return ResponseEntity.ok(dashboardService.getLast7DaysCompletions(appUser));
    }

    @GetMapping("/completion-rate")
    public ResponseEntity<Double> getCompletionRate(Authentication authentication) {
        String email = authentication.getName();
        AppUser appUser = appUserService.getUserByEmail(email);
        return ResponseEntity.ok(dashboardService.completionRate(appUser));
    }

    @GetMapping("/category-stats")
    public ResponseEntity<Object []> getCategoryStats(Authentication authentication) {
        String email = authentication.getName();
        AppUser appUser = appUserService.getUserByEmail(email);
        return ResponseEntity.ok(dashboardService.getCategoryStats(appUser));
    }
}

