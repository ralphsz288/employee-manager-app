package com.ralph.employeemanager.team.dto;

import com.ralph.employeemanager.user.dto.UserDto;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
public class TeamDto {
    private String id;
    private String name;
    private String owner;
    private List<UserDto> members;
}
