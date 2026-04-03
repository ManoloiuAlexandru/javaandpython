package src.main.java.com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import src.main.java.com.example.demo.classes.OrderDB;
import src.main.java.com.example.demo.repository.OrderRepository;

@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/orders")
    public List<OrderDB> getOrders() {
        return orderRepository.findAll();
    }

}
