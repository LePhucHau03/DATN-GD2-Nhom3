package com.example.demospringsecurity.service;

import com.example.demospringsecurity.dto.request.*;
import com.example.demospringsecurity.dto.response.ResultPaginationResponse;
import com.example.demospringsecurity.dto.response.UserResponse;
import com.example.demospringsecurity.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface UserService {
    UserResponse save(UserCreateRequestDTO userRegisterRequestDTO);
    UserResponse update(UserUpdateRequestDTO userUpdateRequestDTO);
    void delete(Long id);
    ResultPaginationResponse findAll(Specification<User> spec, Pageable pageable);
    User findById(Long id);
    User findByEmail(String email);
    void updateUserToken(String token, String email);
    User getUserByEmailAndRefreshToken(String email, String refreshToken);
    String bulkCreateUser(List<UserRegisterRequestDTO> userRegisterRequestDTOS);
    long countAllUser();
    void updateInformation(UpdateInformationDTO updateInformationDTO);
    void changePassWord(ChangePasswordDTO changePasswordDTO);
}
