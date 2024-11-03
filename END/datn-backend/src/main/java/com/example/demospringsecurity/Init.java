package com.example.demospringsecurity;

import com.example.demospringsecurity.model.Role;
import com.example.demospringsecurity.model.User;
import com.example.demospringsecurity.repository.RoleRepository;
import com.example.demospringsecurity.repository.UserRepository;
import com.example.demospringsecurity.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class Init implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserService userService;
    @Override
    public void run(String... args) throws Exception {
        long countUsers = userService.countAllUser();
        long countRoles = roleRepository.count();
        if(countRoles == 0){
            List<Role> roles = new ArrayList<>();
            roles.add(new Role("ROLE_ADMIN"));
            roles.add(new Role("ROLE_USER"));
            roleRepository.saveAll(roles);
        }
        if(countUsers == 0){
            User admin = new User();
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setName("admin");
            admin.setEnabled(true);
            admin.setRole(roleRepository.findByName("ROLE_ADMIN"));
            userRepository.save(admin);
        }

    }
}
