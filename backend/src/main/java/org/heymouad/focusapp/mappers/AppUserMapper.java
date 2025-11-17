package org.heymouad.focusapp.mappers;


import org.heymouad.focusapp.dtos.UserInfoResponse;
import org.heymouad.focusapp.entities.AppUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AppUserMapper {
    @Mapping(target = "username", source = "usernameField")
    UserInfoResponse toUserInfoResponse(AppUser appUser);
}
