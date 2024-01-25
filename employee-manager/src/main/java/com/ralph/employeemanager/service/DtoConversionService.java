package com.ralph.employeemanager.service;

import com.ralph.employeemanager.team.Team;
import com.ralph.employeemanager.team.dto.CreateTeamDto;
import com.ralph.employeemanager.user.User;
import com.ralph.employeemanager.user.dto.RegisterUserDto;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class DtoConversionService {
    public User convertRegisterUserDtoToEntity(RegisterUserDto userDto) {
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setImageUrl(userDto.getImageUrl());
        user.setRole(userDto.getRole());

        return user;
    }

    public Team convertCreateTeamDtoToEntity(CreateTeamDto createTeamDto) {
        Team team = new Team();
        team.setName(createTeamDto.getName());
        team.setOwner(createTeamDto.getOwner());
        team.setMembers(createTeamDto.getMembers() != null ? createTeamDto.getMembers() : Collections.emptyList());
        return team;
    }
}
