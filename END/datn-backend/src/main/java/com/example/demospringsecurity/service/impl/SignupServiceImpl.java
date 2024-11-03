package com.example.demospringsecurity.service.impl;

import com.example.demospringsecurity.dto.request.RegisterRequestDTO;
import com.example.demospringsecurity.dto.response.UserResponse;
import com.example.demospringsecurity.exception.InvalidDataException;
import com.example.demospringsecurity.model.User;
import com.example.demospringsecurity.repository.RoleRepository;
import com.example.demospringsecurity.repository.UserRepository;
import com.example.demospringsecurity.service.SignupService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignupServiceImpl implements SignupService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public UserResponse register(RegisterRequestDTO registerRequestDTO) {
        if (userRepository.existsByEmail(registerRequestDTO.getEmail())) {
            throw new InvalidDataException("Email already exists");
        }
        if(!registerRequestDTO.getPassword().equals(registerRequestDTO.getConfirmPassword())) {
            throw new InvalidDataException("Passwords do not match");
        }
        User user = User.builder()
                .email(registerRequestDTO.getEmail())
                .name(registerRequestDTO.getName())
                .firstName(registerRequestDTO.getFirstName())
                .password(passwordEncoder.encode(registerRequestDTO.getPassword()))
                .role(roleRepository.findByName("ROLE_USER"))
                .enabled(true)
                .build();

        return UserResponse.fromUserToUserResponse(userRepository.save(user));
    }

    @Override
    public void verifyUser(String verificationCode) {

    }

    @Override
    public void resendVerificationCode(String email) {

    }

    @Override
    public void sendVerificationEmail(User user) {

    }

    private String generateVerificationCode() {

        return null;
    }
}
