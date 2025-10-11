package org.heymouad.focusapp.dtos;

public record UserInfoRequest(
        String firstname,
        String lastname,
        String email
) {
}
