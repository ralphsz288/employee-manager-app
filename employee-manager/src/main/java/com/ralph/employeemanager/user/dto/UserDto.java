package com.ralph.employeemanager.user.dto;


import com.ralph.employeemanager.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class UserDto {
    private String id;

    @NotEmpty(message = "First name is required")
    private String firstName;

    @NotEmpty(message = "Last name is required")
    private String lastName;

    @NotEmpty(message = "Password is required")
    private String password;

    @NotEmpty(message = "Email is required")
    @Email(message = "Email should be a valid email address")
    private String email;

    private String imageUrl;

    @NotNull(message = "Role is required")
    private Role role;

    private Boolean isEnabled;

}