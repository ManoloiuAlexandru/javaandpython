package com.example.demo.services;

import com.example.demo.dto.BookOrder;
import com.example.demo.dto.LoginRequest;
import com.example.demo.entity.UserDB;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.dto.User;
import com.example.demo.dto.Book;

import java.util.List;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private  JwtService jwtService;

    public String addUser(User user) {
        UserDB userDB = new UserDB();
        userDB.setName(user.getName());
        userDB.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(userDB);
        return "User added";
    }

    public List<UserDB> getAllUsers() {
        return userRepository.findAll();
    }

    public UserDB getUser(String name) {
        return userRepository.getByName(name);
    }

    public String login(String name, String password) {
        UserDB userDB = userRepository.getByName(name);
        if (!passwordEncoder.matches(password, userDB.getPassword())) {
            return "Wrong password";
        }
        return jwtService.generateToken(name);
    }
}
