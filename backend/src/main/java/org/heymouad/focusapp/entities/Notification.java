package org.heymouad.focusapp.entities;


import lombok.*;
import org.heymouad.focusapp.enums.NotificationStatus;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Notification {
    private NotificationStatus status;
    private String message;
}
