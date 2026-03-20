package com.example.demo;
import com.example.demo.classes.UserDB;
import com.example.demo.repository.UserRepository;

import java.util.List;
import java.util.Map;
import com.example.demo.classes.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of("message", "Welcome to Personal Library");
    }

    @PostMapping("/add_user")
    public Map<String, String> addUser(@RequestBody User user) {

        UserDB userDB = new UserDB();
        userDB.setName(user.getName());
        userDB.setPassword(user.getPassword());
        userRepository.save(userDB);

        return Map.of("message", "Here we are adding users");
    }

    @GetMapping("/users")
    public List<UserDB> getAllUsers() {
        return userRepository.findAll();
    }
}
