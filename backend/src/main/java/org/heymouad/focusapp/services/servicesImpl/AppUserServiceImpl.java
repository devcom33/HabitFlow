package org.heymouad.focusapp.services.servicesImpl;

import lombok.RequiredArgsConstructor;
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
        return appUserRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found."));
    }
}
