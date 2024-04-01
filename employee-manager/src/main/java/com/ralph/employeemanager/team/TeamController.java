package com.ralph.employeemanager.team;

import com.ralph.employeemanager.exception.AlreadyExistsException;
import com.ralph.employeemanager.service.AuthorizationService;
import com.ralph.employeemanager.service.JwtService;
import com.ralph.employeemanager.service.DtoConversionService;
import com.ralph.employeemanager.team.dto.AddUserDto;
import com.ralph.employeemanager.team.dto.CreateTeamDto;
import com.ralph.employeemanager.team.dto.RemoveUserDto;
import com.ralph.employeemanager.user.Role;
import com.ralph.employeemanager.user.User;
import com.ralph.employeemanager.user.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("employee.management/team")
@AllArgsConstructor
public class TeamController {
    private final TeamRepository repository;
    private final TeamService teamService;
    private final AuthorizationService authorizationService;

    @GetMapping("/getTeamsByMember")
    public ResponseEntity<List<Team>> getTeams(
            @RequestParam String userId,
            @RequestHeader("Authorization") String authorizationHeader) {
        authorizationService.checkPermission(authorizationHeader,userId);
        List<Team> resp = this.repository.findByMembersContains(userId);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
    @GetMapping("/getTeamsByOwner")
    public ResponseEntity<List<Team>> getManagedTeams(
        @RequestParam String userId,
        @RequestHeader("Authorization") String authorizationHeader) {
            authorizationService.checkPermission(authorizationHeader,userId);
            List<Team> resp = this.repository.findByOwner(userId);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
    @PostMapping("/create")
    public ResponseEntity<Team> create(
        @Valid
        @RequestBody CreateTeamDto createTeamDto,
        @RequestHeader("Authorization") String authorizationHeader) throws AlreadyExistsException{
            authorizationService.checkPermission(authorizationHeader,createTeamDto.getOwner());
            Team team = teamService.createTeam(createTeamDto);
            return ResponseEntity.status(HttpStatus.OK).body(team);
    }
    @PutMapping("/addUser")
    public ResponseEntity<Team> add(
        @Valid
        @RequestBody AddUserDto addUserDto,
        @RequestHeader("Authorization") String authorizationHeader){
            Team team = teamService.addUser(addUserDto,authorizationHeader);
            return ResponseEntity.status(HttpStatus.OK).body(team);
    }
    @PatchMapping("/removeUser")
    public ResponseEntity<Boolean> removeUser(
        @Valid
        @RequestBody RemoveUserDto removeUserDto,
        @RequestHeader("Authorization") String authorizationHeader) {
            Boolean response = teamService.removeUser(removeUserDto, authorizationHeader);
            return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(
            @RequestParam String teamId,
            @RequestHeader("Authorization") String authorizationHeader) {
        Boolean resp = teamService.deleteTeam(teamId,authorizationHeader);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
    }
}
