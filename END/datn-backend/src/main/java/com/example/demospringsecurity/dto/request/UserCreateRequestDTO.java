package com.example.demospringsecurity.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
@Getter
public class UserCreateRequestDTO implements Serializable {
    @NotBlank
    @Size(min = 3, max = 20)
    private String name;
    @NotBlank
    String firstName;
    @NotBlank
    @Size(min = 6, max = 20)
    private String password;
    @NotBlank
    @Email
    private String email;


    private Role role;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Role{
        private long id;
    }
}
