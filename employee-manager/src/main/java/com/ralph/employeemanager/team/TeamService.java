package com.ralph.employeemanager.team;

import com.ralph.employeemanager.exception.AlreadyExistsException;
import com.ralph.employeemanager.exception.NotFoundException;
import com.ralph.employeemanager.service.AuthorizationService;
import com.ralph.employeemanager.service.DtoConversionService;
import com.ralph.employeemanager.team.dto.AddUserDto;
import com.ralph.employeemanager.team.dto.CreateTeamDto;
import com.ralph.employeemanager.team.dto.RemoveUserDto;
import com.ralph.employeemanager.team.dto.TeamDto;
import com.ralph.employeemanager.user.User;
import com.ralph.employeemanager.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TeamService {
    private final TeamRepository repository;
    private final UserRepository userRepository;
    private final DtoConversionService dtoConversionService;
    private final AuthorizationService authorizationService;

    public List <TeamDto> getTeams(String userId, String authorizationHeader){
        authorizationService.checkPermission(authorizationHeader,userId);
        List<Team> resp = this.repository.findByMembersContains(userId);
        List<TeamDto> teamDto = new ArrayList<>();
        for (Team team : resp) {
            teamDto.add(dtoConversionService.convertEntityToTeamDto(team));
        }
        return teamDto;
    }
    public Team createTeam(CreateTeamDto createTeamDto) {
        Team team = repository.findByNameAndOwner(createTeamDto.getName(), createTeamDto.getOwner());
        if (team != null) {
            throw new AlreadyExistsException("A team with the name " + createTeamDto.getName() + " already exists");
        }
        team = dtoConversionService.convertCreateTeamDtoToEntity(createTeamDto);
        repository.save(team);
        return team;
    }

    public Team addUser(AddUserDto addUserDto,String authorizationHeader) {
        Optional<Team> teamOptional = repository.findById(addUserDto.getTeamId());
        if (teamOptional.isEmpty()) {
            throw new NotFoundException("The selected team does not exist");
        }
        Team team = teamOptional.get();
        String teamOwner = team.getOwner();
        authorizationService.checkPermission(authorizationHeader,teamOwner);

        Optional<User> userOptional = userRepository.findById(addUserDto.getUserId());
        if (userOptional.isEmpty()) {
            throw new NotFoundException("The selected user does not exist");
        }

        if(team.getMembers().contains(addUserDto.getUserId())) {
            throw new AlreadyExistsException("The user you selected is already part of this team");
        }

        team.getMembers().add(addUserDto.getUserId());
        repository.save(team);
        return team;
    }

    public Boolean removeUser(RemoveUserDto removeUserDto, String authorizationHeader) {
        Optional<Team> teamOptional = repository.findById(removeUserDto.getTeamId());
        if (teamOptional.isEmpty()) {
            throw new NotFoundException("The selected team does not exist");
        }

        Team team = teamOptional.get();
        String teamOwner = team.getOwner();
        authorizationService.checkPermission(authorizationHeader,teamOwner);

        if (team.getMembers().contains(removeUserDto.getUserId())) {
            team.getMembers().remove(removeUserDto.getUserId());
            repository.save(team);
            return true;
        } else {
            throw new NotFoundException("The selected user is not part of this team");
        }
    }
    public Boolean deleteTeam(String teamId, String authorizationHeader) {
        Optional<Team> teamOptional = repository.findById(teamId);
        if (teamOptional.isEmpty()) {
            throw new NotFoundException("The selected team does not exist");
        }

        Team team = teamOptional.get();
        String teamOwner = team.getOwner();
        authorizationService.checkPermission(authorizationHeader,teamOwner);

        repository.delete(team);

        return true;
    }
}
