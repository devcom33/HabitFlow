package org.heymouad.focusapp.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
public class HabitCompletion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "habit_id", nullable = false)
    private Habit habit;
    private boolean completed;
    private LocalDate completionDate;
    private LocalDateTime completionTime = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        if (this.completionTime == null) {
            this.completionTime = LocalDateTime.now();
        }
        if (this.completionDate == null) {
            this.completionDate = LocalDate.now();
        }
    }

}
