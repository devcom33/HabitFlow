package org.heymouad.focusapp.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.heymouad.focusapp.enums.Status;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "activity_log")
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Integer level;
}
