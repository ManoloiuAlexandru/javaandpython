package src.main.java.com.example.demo.controllers;

import com.example.demo.request.BuyBooksRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import src.main.java.com.example.demo.services.UserServices;
import src.main.java.com.example.demo.classes.UserDB;
import com.example.demo.dto.User;
import com.example.demo.request.BuyBookRequest;

@RestController
public class UserController {

    @Autowired
    private UserServices userService;

    @PostMapping("/add_user")
    public Map<String, String> addUser(@RequestBody User user) {
        return Map.of("message", userService.addUser(user));
    }

    @GetMapping("/users")
    public List<UserDB> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/buy_books")
    public String buyBook(@RequestBody BuyBooksRequest request) {
        return userService.buyBooks(request.getBooks(), request.getUsername());
    }

    @GetMapping("/get_user")
    public UserDB getUserByName(@RequestParam String name) {
        return userService.getUser(name);
    }

}
