package com.ralph.employeemanager.team.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class CreateTeamDto {
    @NotEmpty(message = "Name is required")
    private String name;
    @NotEmpty(message = "Owner is required")
    private String owner;
    private List<String> members;
}
