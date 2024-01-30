package com.ralph.employeemanager.user.dto;

import lombok.Data;

@Data
public class RegisterResponseDto {
    private UserDto userDto;
    private String errorMessage;
}
