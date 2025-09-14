package org.heymouad.focusapp.services.servicesImpl;


import lombok.RequiredArgsConstructor;
import org.heymouad.focusapp.config.JwtService;
import org.heymouad.focusapp.dtos.AuthenticationRequest;
import org.heymouad.focusapp.dtos.AuthenticationResponse;
import org.heymouad.focusapp.dtos.RegisterRequest;
import org.heymouad.focusapp.entities.AppRole;
import org.heymouad.focusapp.entities.AppUser;
import org.heymouad.focusapp.enums.RoleName;
import org.heymouad.focusapp.repositories.AppRoleRepository;
import org.heymouad.focusapp.repositories.AppUserRepository;
import org.heymouad.focusapp.services.AuthenticationService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AppRoleRepository appRoleRepository;

    @Override
    public AuthenticationResponse register(RegisterRequest request)
    {
        var roles = request.getRoles();
        if (roles == null || roles.isEmpty()) {
            roles = Set.of(RoleName.USER);
        }
        Set<AppRole> assignedRoles = roles.stream()
                .map(roleName -> appRoleRepository.findByRole(roleName)
                        .orElseThrow(() -> new IllegalStateException("Role not found: " + roleName)))
                .collect(Collectors.toSet());

        var user = AppUser.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .roles(assignedRoles)
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        appUserRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request)
    {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = appUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

}
