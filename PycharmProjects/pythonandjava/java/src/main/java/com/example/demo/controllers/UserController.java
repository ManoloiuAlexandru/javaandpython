package com.example.demo.controllers;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.Order;
import com.example.demo.entity.UserDB;
import com.example.demo.request.PaymentRequest;
import com.example.demo.services.OrderService;
import com.example.demo.services.UserServices;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import com.example.demo.dto.User;

@RestController
@Tag(name = "Users", description = "The users related operations")
public class UserController {

    @Autowired
    private UserServices userService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/add_user")
    @Operation(summary = "Add a new user to the DB")
    public Map<String, String> addUser(@RequestBody User user) {
        return Map.of("message", userService.addUser(user));
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users")
    public List<UserDB> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/create_order")
    @Operation(summary = "Create an order")
    public String createNewOrder(@RequestBody Order request) {
        return orderService.createOrder(request);
    }

    @PostMapping("pay")
    @Operation(summary = "Pay an order")
    public String pay(@RequestBody PaymentRequest paymentRequest) {
        return orderService.buyBooks(paymentRequest.getOrderId(), paymentRequest.getCardId(), paymentRequest.getUsername());
    }

    @GetMapping("/get_user")
    @Operation(summary = "Get user using the name")
    public UserDB getUserByName(@RequestParam String name) {
        return userService.getUser(name);
    }

    @PostMapping("/login")
    @Operation(summary = "Login")
    public String login(@RequestBody LoginRequest loginRequest){
        return userService.login(loginRequest.getName(),loginRequest.getPassword());
    }

}
