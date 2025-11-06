package org.heymouad.focusapp.services;

import org.heymouad.focusapp.entities.Notification;

public interface NotificationService {
    void sendNotification(String userId, Notification notification);
}
