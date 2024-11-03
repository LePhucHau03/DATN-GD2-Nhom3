package com.example.demospringsecurity.service;

import com.example.demospringsecurity.dto.request.RegisterRequestDTO;
import com.example.demospringsecurity.dto.response.UserResponse;
import com.example.demospringsecurity.model.User;

public interface SignupService {
    UserResponse register(RegisterRequestDTO registerRequestDTO);
    void verifyUser(String verificationCode);
    void resendVerificationCode(String email);
    void sendVerificationEmail(User user);
}
