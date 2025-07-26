package org.heymouad.focusapp.dtos;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;

@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public record HabitUpdateRequest(Boolean completed){}