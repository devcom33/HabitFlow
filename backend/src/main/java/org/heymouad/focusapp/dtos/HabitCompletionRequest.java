package org.heymouad.focusapp.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;

import java.time.LocalDate;


@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public record HabitCompletionRequest(boolean completed, LocalDate completionDate) {
}
