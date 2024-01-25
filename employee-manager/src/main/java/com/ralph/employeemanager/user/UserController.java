package com.ralph.employeemanager.user;

import com.ralph.employeemanager.config.JwtAuthenticationFilter;
import com.ralph.employeemanager.config.JwtService;
import com.ralph.employeemanager.service.DtoConversionService;
import com.ralph.employeemanager.user.dto.RegisterUserDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("employee.management/user")
@AllArgsConstructor
public class UserController {
    private final UserRepository repository;
    private PasswordEncoder passwordEncoder;
    private JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final DtoConversionService dtoConversionService;

    @PostMapping("/register")
    public ResponseEntity<RegisterUserDto> register(@Valid @RequestBody RegisterUserDto registerUserDto){
        if (repository.findByEmail(registerUserDto.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } else {
            User user = dtoConversionService.convertRegisterUserDtoToEntity(registerUserDto);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            repository.save(user);
            registerUserDto.setId(user.getId());
            return ResponseEntity.status(HttpStatus.OK).body(registerUserDto);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User user){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        String jwtToken = jwtService.generateToken(user);
        return ResponseEntity.status(HttpStatus.OK).body(AuthenticationResponse.builder().token(jwtToken).build());
    }
}
