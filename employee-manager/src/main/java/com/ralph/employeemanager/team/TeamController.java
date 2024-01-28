package com.ralph.employeemanager.team;

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
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("employee.management/team")
@AllArgsConstructor
public class TeamController {
    private final TeamRepository repository;
    private final UserRepository userRepository;
    private JwtService jwtService;
    private final DtoConversionService dtoConversionService;
    private final AuthorizationService authorizationService;

    @GetMapping("/get")

    public ResponseEntity<List<Team>> get(
        @RequestParam String userId,
        @RequestHeader("Authorization") String authorizationHeader) {
            String username = jwtService.extractUsernameFromHeader(authorizationHeader);
            System.out.println(username);
            User user = userRepository.findByEmail(username).get();
            authorizationService.checkPermission(user,userId);
            if (user.getId().equals(userId) || user.getRole().equals(Role.ADMIN)) {
                List<Team> resp = this.repository.findByOwner(userId);
                return ResponseEntity.status(HttpStatus.OK).body(resp);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
    }

    @PostMapping("/create")
    public ResponseEntity<Team> create(@Valid @RequestBody CreateTeamDto createTeamDto) {
        Team team = dtoConversionService.convertCreateTeamDtoToEntity(createTeamDto);
        repository.save(team);
        return ResponseEntity.status(HttpStatus.OK).body(team);
    }

    @PatchMapping("/removeUser")
    public ResponseEntity<Boolean> removeUser(@Valid @RequestBody RemoveUserDto removeUserDto) {
        Optional<Team> teamOptional = repository.findById(removeUserDto.getTeamId());
        if (teamOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }

        Team team = teamOptional.get();
        if (team.getMembers().contains(removeUserDto.getUserId())) {
            team.getMembers().remove(removeUserDto.getUserId());
            repository.save(team);
        } else {
            System.out.println("no user");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }

        return ResponseEntity.status(HttpStatus.OK).body(true);
    }
}
