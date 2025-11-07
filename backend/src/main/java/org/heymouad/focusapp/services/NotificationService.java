package org.heymouad.focusapp.services;

import org.heymouad.focusapp.entities.Notification;

public interface NotificationService {
    void sendNotification(String userEmail, Notification notification);
}
