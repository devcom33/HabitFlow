package org.heymouad.focusapp.services;

import org.heymouad.focusapp.dtos.AppUserResponse;
import org.heymouad.focusapp.dtos.UserInfoRequest;
import org.heymouad.focusapp.entities.AppUser;

public interface AppUserService {
    AppUser getUserDetails(Long id);

    AppUser getUserByEmail(String email);

    AppUserResponse updateUserSettings(String currentUserEmail, UserInfoRequest userInfoRequest);
}
