package org.heymouad.focusapp.controllers;


import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.dtos.AppUserResponse;
import org.heymouad.focusapp.dtos.UserInfoRequest;
import org.heymouad.focusapp.dtos.UserInfoResponse;
import org.heymouad.focusapp.entities.AppUser;
import org.heymouad.focusapp.mappers.AppUserMapper;
import org.heymouad.focusapp.services.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;

@RequestMapping("/api/v1/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final AppUserService appUserService;
    private final AppUserMapper appUserMapper;


    @GetMapping("/settings")
    public ResponseEntity<UserInfoResponse> getCurrentUser(Authentication authentication)
    {
        String email = authentication.getName();

        AppUser appUser = appUserService.getUserByEmail(email);

        UserInfoResponse userInfo = appUserMapper.toUserInfoResponse(appUser);
        return ResponseEntity.ok().body(userInfo);

    }
    @PatchMapping("/settings/update")
    public ResponseEntity<AppUserResponse> updateUserSettings(
            @RequestBody UserInfoRequest userInfoRequest,
            Authentication authentication)
    {
        String currentUserEmail = authentication.getName();
        AppUserResponse updatedUser = appUserService.updateUserSettings(currentUserEmail, userInfoRequest);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<UserInfoResponse> getUserInfo(@PathVariable("id") long id)
    {
        AppUser appUser = appUserService.getUserDetails(id);
        UserInfoResponse userInfo = appUserMapper.toUserInfoResponse(appUser);
        return ResponseEntity.ok().body(userInfo);
    }
}
