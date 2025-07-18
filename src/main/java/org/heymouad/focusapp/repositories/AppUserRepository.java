package org.heymouad.focusapp.repositories;

import org.heymouad.focusapp.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
}
