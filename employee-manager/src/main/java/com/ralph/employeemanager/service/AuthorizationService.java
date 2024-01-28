package com.ralph.employeemanager.service;

import com.ralph.employeemanager.user.Role;
import com.ralph.employeemanager.user.User;
import com.ralph.employeemanager.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthorizationService {
    private JwtService jwtService;
    private UserRepository userRepository;
    public void checkPermission(String authorizationHeader, String userId) {
        String username = jwtService.extractUsernameFromHeader(authorizationHeader);
        User user = userRepository.findByEmail(username).get();
        if (!user.getId().equals(userId) && !user.getRole().equals(Role.ADMIN)) {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }
}
