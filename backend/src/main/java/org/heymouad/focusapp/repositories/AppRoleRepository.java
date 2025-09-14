package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.entities.AppRole;
import org.heymouad.focusapp.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppRoleRepository extends JpaRepository<AppRole, Long> {
    Optional<AppRole> findByRole(RoleName role);
}
