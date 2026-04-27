package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import com.example.demo.entity.OrderDB;
import com.example.demo.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public List<OrderDB> getOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping("/get_order")
    public OrderDB getOrder(@RequestParam Long orderId) {
        return orderService.getOrder(orderId);
    }

    @GetMapping("/get_client_order")
    public List<OrderDB> getClientOrders(Authentication authentication)
    {
        return orderService.getClientOrders(authentication.getName());
    }
}
