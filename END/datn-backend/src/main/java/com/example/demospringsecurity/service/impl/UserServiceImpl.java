package com.example.demospringsecurity.service.impl;

import com.example.demospringsecurity.dto.request.*;
import com.example.demospringsecurity.dto.response.ResultPaginationResponse;
import com.example.demospringsecurity.dto.response.UserResponse;
import com.example.demospringsecurity.mapper.UserMapping;
import com.example.demospringsecurity.service.UserService;
import com.example.demospringsecurity.exception.InvalidDataException;
import com.example.demospringsecurity.exception.ResourceNotFoundException;
import com.example.demospringsecurity.model.User;
import com.example.demospringsecurity.repository.RoleRepository;
import com.example.demospringsecurity.repository.UserRepository;

import com.example.demospringsecurity.mapper.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserMapping userMapping;
    @Override
    public UserResponse save(UserCreateRequestDTO userRegisterRequestDTO) {
        if (userRepository.existsByEmail(userRegisterRequestDTO.getEmail())) {
            throw new InvalidDataException("Email already exists");
        }
        User user = new User();
        user.setEmail(userRegisterRequestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRegisterRequestDTO.getPassword()));
        user.setName(userRegisterRequestDTO.getName());
        user.setFirstName(userRegisterRequestDTO.getFirstName());
        user.setRole(roleRepository.findByName("ROLE_USER"));
        user.setEnabled(true);
        return UserResponse.fromUserToUserResponse(userRepository.save(user));
    }

    @Override
    public UserResponse update(UserUpdateRequestDTO userUpdateRequestDTO) {
        User user = this.findById(userUpdateRequestDTO.getId());
        user.setName(userUpdateRequestDTO.getName());
        user.setFirstName(userUpdateRequestDTO.getFirstName());
        user.setEnabled(userUpdateRequestDTO.isEnabled());
        return UserResponse.fromUserToUserResponse(userRepository.save(user));
    }


    @Override
    public void delete(Long id) {
        User user = findById(id);
        String email = SecurityUtil.getCurrentUserLogin().orElse("");

        if (user.getEmail().equals(email)) {
            throw new RuntimeException("Không thể xóa user hiện tại của bạn");
        }
        if (user.getRole().getName().equals("ROLE_ADMIN")) {
            throw new RuntimeException("Không thể xóa ADMIN");
        }
        user.setEnabled(false);
        userRepository.save(user);
    }

    @Override
    public ResultPaginationResponse findAll(Specification<User> spec, Pageable pageable) {
        Page<User> users = userRepository.findAll(spec, pageable);
        ResultPaginationResponse.Meta meta = ResultPaginationResponse.Meta.builder()
                .total(users.getTotalElements())
                .pages(users.getTotalPages())
                .page(pageable.getPageNumber() + 1)
                .pageSize(pageable.getPageSize())
                .build();
        List<UserResponse> userResponses = users.getContent().stream().map(UserResponse::fromUserToUserResponse).toList();
        return ResultPaginationResponse.builder()
                .meta(meta)
                .result(userResponses)
                .build();
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void updateUserToken(String token, String email) {
        User user = findByEmail(email);
        user.setRefreshToken(token);
        userRepository.save(user);
    }

    @Override
    public User getUserByEmailAndRefreshToken(String email, String refreshToken) {
        return userRepository.findByEmailAndRefreshToken(email, refreshToken);
    }

    @Override
    public String bulkCreateUser(List<UserRegisterRequestDTO> userRegisterRequestDTOS) {
        return null;
    }

    @Override
    public long countAllUser() {
        return userRepository.count();
    }

    @Override
    public void updateInformation(UpdateInformationDTO updateInformationDTO) {
        User user = this.findById(updateInformationDTO.getId());
        user.setFirstName(updateInformationDTO.getFirstName());
        user.setName(updateInformationDTO.getName());

        userRepository.save(user);
    }

    @Override
    public void changePassWord(ChangePasswordDTO changePasswordDTO) {
        User user = this.findById(changePasswordDTO.getId());

        if(!passwordEncoder.matches(changePasswordDTO.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Password does not match");
        }

        if(!changePasswordDTO.getNewPassword().equals(changePasswordDTO.getConfirmPassword())) {
            throw new RuntimeException("New password does not match");
        }

        user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        userRepository.save(user);
    }
}