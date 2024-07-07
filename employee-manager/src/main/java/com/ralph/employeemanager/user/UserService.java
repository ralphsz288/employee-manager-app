package com.ralph.employeemanager.user;

import com.ralph.employeemanager.confirmation_token.ConfirmationToken;
import com.ralph.employeemanager.confirmation_token.ConfirmationTokenRepository;
import com.ralph.employeemanager.confirmation_token.ConfirmationTokenService;
import com.ralph.employeemanager.exception.NotFoundException;
import com.ralph.employeemanager.service.DtoConversionService;
import com.ralph.employeemanager.service.EmailService;
import com.ralph.employeemanager.service.JwtService;
import com.ralph.employeemanager.user.dto.AuthenticationResponse;
import com.ralph.employeemanager.user.dto.LoginUserDto;
import com.ralph.employeemanager.user.dto.RegisterResponse;
import com.ralph.employeemanager.user.dto.UserDto;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final ConfirmationTokenService confirmationTokenService;
    private final AuthenticationManager authenticationManager;
    private final DtoConversionService dtoConversionService;
    @Autowired
    private Environment env;

    public RegisterResponse register (UserDto userDto) {
        RegisterResponse registerResponse = new RegisterResponse();
        try {
            User user = dtoConversionService.convertUserDtoToEntity(userDto);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setIsEnabled(false);
            repository.save(user);
            System.out.println(user);
                
            ConfirmationToken confirmationToken = emailService.generateConfirmationToken(user.getId());
            confirmationTokenService.saveConfirmationToken(confirmationToken);
            String link = "http://" + env.getProperty("spring.host") +":8080/employee.management/user/confirm?token=" + confirmationToken.getToken();
            emailService.send(user.getEmail(),emailService.buildRegisterEmail(userDto.getFirstName(), link));
            registerResponse.setUserDto(dtoConversionService.convertEntityToUserDto(user));
            return registerResponse;

        } catch (IllegalStateException e) {
            Optional<User> user = repository.findByEmail(userDto.getEmail());
            user.ifPresent(repository::delete);
            registerResponse.setErrorMessage(e.getMessage());
            return registerResponse;
        }
    }
    public AuthenticationResponse login(LoginUserDto loginUserDto){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(),loginUserDto.getPassword()));
        Optional<User> userOptional = repository.findByEmail(loginUserDto.getEmail());
        User user = userOptional.get();
        String jwtToken = jwtService.generateToken(user);
        System.out.println(user);
        return AuthenticationResponse.builder().token(jwtToken).userDto(dtoConversionService.convertEntityToUserDto(user)).build();
    }

    public UserDto getUserDataFromJWT(String authorizationHeader){
        Optional<User> userOptional = repository.findByEmail(jwtService.extractUsernameFromHeader(authorizationHeader));
        User user = userOptional.get();
        return dtoConversionService.convertEntityToUserDto(user);
    }

    @Transactional
    public String confirmEmailToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(token).orElseThrow(()-> new IllegalStateException("token not found"));

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();
        if( expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        User user = repository.findById(confirmationToken.getUserId()).orElseThrow(() -> new NotFoundException("User not found"));
        if (user.getIsEnabled()) {
            confirmationTokenRepository.delete(confirmationToken);
            throw new NotFoundException("Email was already confirmed");
        }

        user.setIsEnabled(true);
        repository.save(user);
        confirmationTokenRepository.delete(confirmationToken);
        return "Confirmation successful";
    }
}
