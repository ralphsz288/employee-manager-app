package com.ralph.employeemanager.team;

import com.ralph.employeemanager.exception.AlreadyExistsException;
import com.ralph.employeemanager.exception.NotFoundException;
import com.ralph.employeemanager.service.AuthorizationService;
import com.ralph.employeemanager.service.DtoConversionService;
import com.ralph.employeemanager.team.dto.CreateTeamDto;
import com.ralph.employeemanager.team.dto.RemoveUserDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class TeamService {
    private final DtoConversionService dtoConversionService;
    private final TeamRepository repository;

    public Team createTeam(CreateTeamDto createTeamDto) {
        Team team = repository.findByNameAndOwner(createTeamDto.getName(), createTeamDto.getOwner());
        if (team != null) {
            throw new AlreadyExistsException("A team with the name " + createTeamDto.getName() + " already exists");
        }
        team = dtoConversionService.convertCreateTeamDtoToEntity(createTeamDto);
        repository.save(team);
        return team;
    }

    public Boolean removeUser(RemoveUserDto removeUserDto) {
        Optional<Team> teamOptional = repository.findById(removeUserDto.getTeamId());
        if (teamOptional.isEmpty()) {
            throw new NotFoundException("The selected team does not exist");
        }

        Team team = teamOptional.get();
        if (team.getMembers().contains(removeUserDto.getUserId())) {
            team.getMembers().remove(removeUserDto.getUserId());
            repository.save(team);
            return true;
        } else {
            throw new NotFoundException("The selected user is not part of this team");
        }
    }

}
