package org.heymouad.focusapp.services.servicesImpl;

import lombok.AllArgsConstructor;
import org.heymouad.focusapp.entities.ActivityLog;
import org.heymouad.focusapp.repositories.ActivityLogRepository;
import org.heymouad.focusapp.services.ActivityLogService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ActivityLogServiceImpl implements ActivityLogService {
    private final ActivityLogRepository activityLogRepository;

    @Override
    public ActivityLog saveActivity(ActivityLog activityLog) {
        return activityLogRepository.save(activityLog);
    }
}
