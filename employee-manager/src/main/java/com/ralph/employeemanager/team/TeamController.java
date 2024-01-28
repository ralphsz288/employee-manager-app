package com.ralph.employeemanager.team;

import com.ralph.employeemanager.exception.AlreadyExistsException;
import com.ralph.employeemanager.service.AuthorizationService;
import com.ralph.employeemanager.service.JwtService;
import com.ralph.employeemanager.service.DtoConversionService;
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
@RequestMapping("employee.management/team")
@AllArgsConstructor
public class TeamController {
    private final TeamRepository repository;
    private final TeamService teamService;
    private final AuthorizationService authorizationService;

    @GetMapping("/get")

    public ResponseEntity<List<Team>> get(
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

    @PatchMapping("/removeUser")
    public ResponseEntity<Boolean> removeUser(@Valid @RequestBody RemoveUserDto removeUserDto) {
        Boolean response = teamService.removeUser(removeUserDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
