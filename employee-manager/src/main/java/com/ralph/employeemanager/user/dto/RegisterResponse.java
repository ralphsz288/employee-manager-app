package com.ralph.employeemanager.user.dto;

import lombok.Data;

@Data
public class RegisterResponse {
    private UserDto userDto;
    private String errorMessage;
}
