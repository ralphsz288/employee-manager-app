package com.ralph.employeemanager.team.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class RemoveUserDto {
    @NotEmpty(message = "Team id is required")
    private String teamId;

    @NotEmpty(message = "User id is required")
    private String userId;
}
