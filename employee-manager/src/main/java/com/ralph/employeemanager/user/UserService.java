package com.ralph.employeemanager.user;

import com.ralph.employeemanager.service.DtoConversionService;
import com.ralph.employeemanager.service.JwtService;
import com.ralph.employeemanager.user.User;
import com.ralph.employeemanager.user.UserRepository;
import com.ralph.employeemanager.user.dto.AuthenticationResponse;
import com.ralph.employeemanager.user.dto.LoginUserDto;
import com.ralph.employeemanager.user.dto.UserDto;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository repository;
    private PasswordEncoder passwordEncoder;
    private JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final DtoConversionService dtoConversionService;

    public UserDto register (UserDto userDto) {
        User user = dtoConversionService.convertUserDtoToEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(user);
        userDto.setId(user.getId());
        return userDto;
    }

    public AuthenticationResponse login(LoginUserDto loginUserDto){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(),loginUserDto.getPassword()));
        Optional<User> userOptional = repository.findByEmail(loginUserDto.getEmail());
        User user = userOptional.get();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).userDto(dtoConversionService.convertEntityToUserDto(user)).build();
    }
}
