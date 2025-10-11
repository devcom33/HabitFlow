package org.heymouad.focusapp.dtos;

import org.heymouad.focusapp.entities.AppUser;

public record AppUserResponse(
        String firstname,
        String lastname,
        String email
) {
    public static AppUserResponse from(AppUser user) {
        return new AppUserResponse(user.getFirstname(), user.getLastname(), user.getEmail());
    }
}
