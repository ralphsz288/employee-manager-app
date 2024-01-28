package com.ralph.employeemanager.team.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AddUserDto {
    @NotEmpty(message = "TeamId is required")
    private String teamId;
    @NotEmpty(message = "UserId is required")
    private String userId;
}
