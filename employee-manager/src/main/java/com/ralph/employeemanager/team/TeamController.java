package com.ralph.employeemanager.team;

import com.ralph.employeemanager.config.JwtService;
import com.ralph.employeemanager.service.DtoConversionService;
import com.ralph.employeemanager.team.dto.CreateTeamDto;
import com.ralph.employeemanager.team.dto.RemoveUserDto;
import com.ralph.employeemanager.user.User;
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
    private JwtService jwtService;
    private final DtoConversionService dtoConversionService;

    @GetMapping("/get")
    public ResponseEntity<List<Team>> get(@RequestParam String userId) {
        List<Team> resp = this.repository.findByOwner(userId);
        return ResponseEntity.status(HttpStatus.OK).body(resp);
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
            System.out.println("no team");
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
