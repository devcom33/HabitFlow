package org.heymouad.focusapp.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class HabitCompletionCountDTO {
    private LocalDate completionDate;
    private Long count;
}