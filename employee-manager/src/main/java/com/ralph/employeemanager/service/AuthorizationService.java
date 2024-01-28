package com.ralph.employeemanager.service;

import com.ralph.employeemanager.user.Role;
import com.ralph.employeemanager.user.User;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {
    public void checkPermission(User user, String userId) {
        if (!user.getId().equals(userId) && !user.getRole().equals(Role.ADMIN)) {
            throw new AccessDeniedException("You do not have permission to access this resource.");
        }
    }
}
