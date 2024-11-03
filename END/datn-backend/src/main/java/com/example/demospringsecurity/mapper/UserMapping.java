package com.example.demospringsecurity.mapper;

import com.example.demospringsecurity.dto.request.UserRegisterRequestDTO;
import com.example.demospringsecurity.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapping {
    User toUser(UserRegisterRequestDTO userRegisterRequestDTO);
}
