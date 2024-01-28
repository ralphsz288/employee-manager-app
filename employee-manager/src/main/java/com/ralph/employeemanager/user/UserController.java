package com.ralph.employeemanager.user;

import com.ralph.employeemanager.user.dto.AuthenticationResponse;
import com.ralph.employeemanager.user.dto.LoginUserDto;
import com.ralph.employeemanager.user.dto.UserDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("employee.management/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository repository;


    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody UserDto registerUserDto){
        if (repository.findByEmail(registerUserDto.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } else {
            UserDto response = userService.register(registerUserDto);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginUserDto loginUserDto){
        AuthenticationResponse response = userService.login(loginUserDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
