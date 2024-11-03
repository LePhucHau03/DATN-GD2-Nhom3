package com.example.demospringsecurity.repository;

import com.example.demospringsecurity.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoleRepository extends JpaRepository<Role, Long> {
    boolean existsByName(String name);
    Role findByName(String name);
}
