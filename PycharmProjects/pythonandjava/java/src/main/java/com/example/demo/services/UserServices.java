package com.example.demo.services;

import com.example.demo.dto.*;
import com.example.demo.entity.BookDB;
import com.example.demo.entity.UserDB;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    private JwtService jwtService;

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

    public TokenResponse login(String name, String password) {
        UserDB userDB = userRepository.getByName(name);
        TokenResponse tokenResponse = new TokenResponse();
        if (userDB==null || !passwordEncoder.matches(password, userDB.getPassword())) {
            tokenResponse.setToken(null);
            tokenResponse.setMessage("Wrong credentials");

        } else {
            tokenResponse.setToken(jwtService.generateToken(name));
            tokenResponse.setMessage("Success");
        }
        return tokenResponse;
    }

    public List<BookDB> getMyBooks(String name)
    {
        return userRepository.getByName(name).getBooks();
    }
}
