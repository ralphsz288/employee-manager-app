package com.ralph.employeemanager.user;

import com.ralph.employeemanager.user.dto.AuthenticationResponse;
import com.ralph.employeemanager.user.dto.LoginUserDto;
import com.ralph.employeemanager.user.dto.RegisterResponseDto;
import com.ralph.employeemanager.user.dto.UserDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("employee.management/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository repository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDto registerUserDto){
        if (repository.findByEmail(registerUserDto.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Collections.singletonMap("error", "An account with this email already exists"));
        }
        RegisterResponseDto registerResponseDto = userService.register(registerUserDto);
        if (registerResponseDto.getErrorMessage() != null ) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", registerResponseDto.getErrorMessage()));
        }
        return ResponseEntity.status(HttpStatus.OK).body(registerResponseDto.getUserDto());
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginUserDto loginUserDto){
        AuthenticationResponse response = userService.login(loginUserDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
