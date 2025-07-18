package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.entities.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
}
