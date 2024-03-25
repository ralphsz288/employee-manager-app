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

    public RegisterResponse register (UserDto userDto) {
        RegisterResponse registerResponse = new RegisterResponse();
        try {
            User user = dtoConversionService.convertUserDtoToEntity(userDto);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setIsEnabled(false);
            repository.save(user);
            System.out.println(user);

            ConfirmationToken confirmationToken = generateConfirmationToken(user.getId());
            confirmationTokenService.saveConfirmationToken(confirmationToken);
            String link = "http://localhost:8080/employee.management/user/confirm?token=" + confirmationToken.getToken();
            emailService.send(user.getEmail(),buildEmail(userDto.getFirstName(), link));
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
    public String confirmToken(String token) {
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

    private ConfirmationToken generateConfirmationToken(String userId) {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                userId,
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15)
        );
        return confirmationToken;
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirm your email</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
}
