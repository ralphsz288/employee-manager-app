package com.ralph.employeemanager.team;

import com.ralph.employeemanager.confirmation_token.ConfirmationToken;
import com.ralph.employeemanager.confirmation_token.ConfirmationTokenRepository;
import com.ralph.employeemanager.confirmation_token.ConfirmationTokenService;
import com.ralph.employeemanager.exception.AlreadyExistsException;
import com.ralph.employeemanager.exception.NotFoundException;
import com.ralph.employeemanager.service.AuthorizationService;
import com.ralph.employeemanager.service.DtoConversionService;
import com.ralph.employeemanager.service.EmailService;
import com.ralph.employeemanager.team.dto.AddUserDto;
import com.ralph.employeemanager.team.dto.CreateTeamDto;
import com.ralph.employeemanager.team.dto.RemoveUserDto;
import com.ralph.employeemanager.team.dto.TeamDto;
import com.ralph.employeemanager.user.User;
import com.ralph.employeemanager.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
public class TeamService {
    private final TeamRepository repository;
    private final UserRepository userRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final DtoConversionService dtoConversionService;
    private final AuthorizationService authorizationService;
    private final EmailService emailService;
    private final ConfirmationTokenService confirmationTokenService;
    @Autowired
    private Environment env;

    public List <TeamDto> getTeams(String userId, String authorizationHeader){
        authorizationService.checkPermission(authorizationHeader,userId);
        List<Team> resp = this.repository.findByMembersContains(userId);
        List<TeamDto> teamDto = new ArrayList<>();
        for (Team team : resp) {
            teamDto.add(dtoConversionService.convertEntityToTeamDto(team));
        }
        return teamDto;
    }

    public List <TeamDto> getTeamsByOwner(String userId, String authorizationHeader){
        authorizationService.checkPermission(authorizationHeader,userId);
        List<Team> resp = this.repository.findByOwner(userId);
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

    public Map<String, String> addUser(AddUserDto addUserDto, String authorizationHeader) {
        Optional<Team> teamOptional = repository.findById(addUserDto.getTeamId());
        if (teamOptional.isEmpty()) {
            throw new NotFoundException("The selected team does not exist");
        }
        Team team = teamOptional.get();
        String teamOwner = team.getOwner();
        authorizationService.checkPermission(authorizationHeader,teamOwner);

        Optional<User> userOptional = userRepository.findByEmail(addUserDto.getEmail());
        if (userOptional.isEmpty()) {
            throw new NotFoundException("The selected user does not exist");
        }

        Optional<User> ownerOptional = userRepository.findById(teamOwner);
        if (ownerOptional.isEmpty()) {
            throw new NotFoundException("The selected owner does not exist");
        }
        User owner = ownerOptional.get();
        if (addUserDto.getEmail().equals(owner.getEmail())) {
           throw new UnsupportedOperationException("The selected user is the owner of the team");
        }

        User newMember = userOptional.get();
        String memberId = newMember.getId();
        if(team.getMembers().contains(memberId)) {
            throw new AlreadyExistsException("The user you selected is already part of this team");
        }

        ConfirmationToken confirmationToken = emailService.generateConfirmationToken(memberId);
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        String link = "http://" + env.getProperty("spring.host") + ":8080/employee.management/team/confirmInvitation?teamId=" + team.getId() + "&token=" + confirmationToken.getToken();
        emailService.send(newMember.getEmail(),emailService.buildJoinTeamRequestEmail(owner.getFirstName(),team.getName(),newMember.getFirstName(),link));

        return Collections.singletonMap("message", "The request was sent successfully!");
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
    @Transactional
    public String confirmInvitation(String teamId,String token) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(token).orElseThrow(()-> new NotFoundException("token not found"));
        LocalDateTime expiredAt = confirmationToken.getExpiresAt();
        if(expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        Team team = repository.findById(teamId).orElseThrow(() -> new NotFoundException("Team not found"));
        User user = userRepository.findById(confirmationToken.getUserId()).orElseThrow(() -> new NotFoundException("User not found"));

        team.getMembers().add(user.getId());
        repository.save(team);
        confirmationTokenRepository.delete(confirmationToken);

        return "Confirmation successful";
    }
}
