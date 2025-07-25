package org.heymouad.focusapp.dtos;
import java.time.LocalDate;

public record HabitRequestDto(String name, boolean completed, LocalDate createdAt){};
