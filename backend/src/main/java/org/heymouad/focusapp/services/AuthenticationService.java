package org.heymouad.focusapp.services;

import org.heymouad.focusapp.dtos.AuthenticationRequest;
import org.heymouad.focusapp.dtos.AuthenticationResponse;
import org.heymouad.focusapp.dtos.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
