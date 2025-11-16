package org.heymouad.focusapp.dtos;

import java.time.LocalDate;

public record UserInfoResponse(
        String username,
        String firstname,
        String lastname,
        String email,
        String gender,
        LocalDate createdAt) {
}
