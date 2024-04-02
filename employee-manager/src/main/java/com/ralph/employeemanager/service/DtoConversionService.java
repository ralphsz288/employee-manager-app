package com.ralph.employeemanager.service;

import com.ralph.employeemanager.team.Team;
import com.ralph.employeemanager.team.dto.CreateTeamDto;
import com.ralph.employeemanager.team.dto.TeamDto;
import com.ralph.employeemanager.user.User;
import com.ralph.employeemanager.user.UserRepository;
import com.ralph.employeemanager.user.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class DtoConversionService {
    @Autowired
    private UserRepository userRepository;
    public User convertUserDtoToEntity(UserDto userDto) {
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setImageUrl(userDto.getImageUrl());
        user.setRole(userDto.getRole());
        return user;
    }

    public UserDto convertEntityToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setImageUrl(user.getImageUrl());
        userDto.setRole(user.getRole());
        userDto.setIsEnabled(user.getIsEnabled());
        userDto.setIsEnabled(user.getIsEnabled());

        return userDto;
    }

    public Team convertCreateTeamDtoToEntity(CreateTeamDto createTeamDto) {
        Team team = new Team();
        team.setName(createTeamDto.getName());
        team.setOwner(createTeamDto.getOwner());
        team.setMembers(createTeamDto.getMembers() != null ? createTeamDto.getMembers() : Collections.emptyList());
        return team;
    }

    public TeamDto convertEntityToTeamDto(Team team) {
        TeamDto teamDto = new TeamDto();
        teamDto.setId(team.getId());
        teamDto.setName(team.getName());
        teamDto.setOwner(team.getOwner());

        List<UserDto> members = new ArrayList<>();
        for(String id : team.getMembers()){
            Optional<User> user = userRepository.findById(id);
            user.ifPresent(value -> members.add(convertEntityToUserDto(value)));
        }
        teamDto.setMembers(members);
        return teamDto;
    }
}
