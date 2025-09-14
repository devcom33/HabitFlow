package org.heymouad.focusapp.bootstrap;

import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.entities.AppRole;
import org.heymouad.focusapp.enums.RoleName;
import org.heymouad.focusapp.repositories.AppRoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoleSeeder implements CommandLineRunner {
    private final AppRoleRepository appRoleRepository;
    @Override
    public void run(String... args) throws Exception {
        if (appRoleRepository.findByRole(RoleName.USER).isEmpty())
        {
            appRoleRepository.save(new AppRole(null, RoleName.USER));
        }
        if (appRoleRepository.findByRole(RoleName.ADMIN).isEmpty())
        {
            appRoleRepository.save(new AppRole(null, RoleName.ADMIN));
        }
    }
}
