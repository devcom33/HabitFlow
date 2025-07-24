package org.heymouad.focusapp.controllers;

import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.dtos.ActivityLogRequestDto;
import org.heymouad.focusapp.entities.ActivityLog;
import org.heymouad.focusapp.mappers.ActivityLogMapper;
import org.heymouad.focusapp.services.ActivityLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class ActivityController {
    private final ActivityLogService activityLogService;
    private final ActivityLogMapper activityLogMapper;

    @PostMapping("/ActivityLog")
    public ResponseEntity<ActivityLog> saveActivity(@RequestBody ActivityLogRequestDto activityLogRequestDto)
    {
        ActivityLog activityLog = activityLogMapper.toActivityLog(activityLogRequestDto);
        ActivityLog savedActivity = activityLogService.saveActivity(activityLog);

        return ResponseEntity.ok(savedActivity);
    }
}