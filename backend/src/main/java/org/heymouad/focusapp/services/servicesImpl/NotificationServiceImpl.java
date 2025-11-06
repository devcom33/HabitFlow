package org.heymouad.focusapp.services.servicesImpl;


import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.heymouad.focusapp.entities.Notification;
import org.heymouad.focusapp.services.NotificationService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
    private final SimpMessagingTemplate messagingTemplate;


    public void sendNotification(String userId, Notification notification)
    {
        log.info("Sending WS notification to {} with payload {}", userId, notification);
        messagingTemplate.convertAndSendToUser(
                userId,
                "/queue/notification",
                notification
        );
    }



}
