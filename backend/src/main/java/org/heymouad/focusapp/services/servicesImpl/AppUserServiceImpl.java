package org.heymouad.focusapp.services.servicesImpl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.dtos.AppUserResponse;
import org.heymouad.focusapp.dtos.UserInfoRequest;
import org.heymouad.focusapp.entities.AppUser;
import org.heymouad.focusapp.repositories.AppUserRepository;
import org.heymouad.focusapp.services.AppUserService;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService {
    private final AppUserRepository appUserRepository;

    public AppUser getUserDetails(Long id)
    {
        return appUserRepository.findById(id).orElseThrow(()->new RuntimeException("User not found."));
    }

    @Override
    public AppUser getUserByEmail(String email) {
        return appUserRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found: "+ email));
    }

    @Transactional
    public AppUserResponse updateUserSettings(String currentUserEmail, UserInfoRequest userInfoRequest)
    {
        AppUser appUser = getUserByEmail(currentUserEmail);

        if (userInfoRequest.firstname() != null && !userInfoRequest.firstname().isBlank()) {
            appUser.setFirstname(userInfoRequest.firstname());
        }

        if (userInfoRequest.lastname() != null && !userInfoRequest.lastname().isBlank()) {
            appUser.setLastname(userInfoRequest.lastname());
        }

        if (userInfoRequest.email() != null && !userInfoRequest.email().isBlank()) {
            appUser.setEmail(userInfoRequest.email());
        }

        AppUser updatedUser = appUserRepository.save(appUser);

        return AppUserResponse.from(updatedUser);
    }
}
