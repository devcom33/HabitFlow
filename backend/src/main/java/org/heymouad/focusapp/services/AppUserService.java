package org.heymouad.focusapp.services;

import org.heymouad.focusapp.entities.AppUser;

public interface AppUserService {
    AppUser getUserDetails(Long id);

    AppUser getUserByEmail(String email);
}
