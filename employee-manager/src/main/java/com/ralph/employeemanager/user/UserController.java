package com.ralph.employeemanager.user;

import com.ralph.employeemanager.user.dto.AuthenticationResponse;
import com.ralph.employeemanager.user.dto.LoginUserDto;
import com.ralph.employeemanager.user.dto.RegisterResponse;
import com.ralph.employeemanager.user.dto.UserDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@CrossOrigin(origins = "*")
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
        RegisterResponse registerResponse = userService.register(registerUserDto);
        if (registerResponse.getErrorMessage() != null ) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", registerResponse.getErrorMessage()));
        }
        return ResponseEntity.status(HttpStatus.OK).body(registerResponse.getUserDto());
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginUserDto loginUserDto){
        AuthenticationResponse response = userService.login(loginUserDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @GetMapping("/confirm")
    public ResponseEntity<String> confirm(@RequestParam("token") String token){
        String response = userService.confirmToken(token);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @GetMapping("/checkToken")
    public ResponseEntity<UserDto> checkToken(@RequestHeader("Authorization") String authorizationHeader){
        UserDto user = userService.getUserDataFromJWT(authorizationHeader);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}
