package org.heymouad.focusapp.dtos;

import org.heymouad.focusapp.enums.Status;

import java.time.LocalDate;

public record ActivityLogRequestDto(LocalDate date, Status status, Integer level){};
