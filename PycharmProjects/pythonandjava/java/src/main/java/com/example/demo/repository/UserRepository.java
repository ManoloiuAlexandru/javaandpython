package com.example.demo.repository;

import com.example.demo.entity.UserDB;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<UserDB, Long> {
    UserDB getByName(String name);
}