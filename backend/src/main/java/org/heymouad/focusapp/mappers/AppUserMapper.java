package org.heymouad.focusapp.mappers;


import org.heymouad.focusapp.dtos.UserInfoResponse;
import org.heymouad.focusapp.entities.AppUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AppUserMapper {
    UserInfoResponse toUserInfoResponse(AppUser appUser);
}
