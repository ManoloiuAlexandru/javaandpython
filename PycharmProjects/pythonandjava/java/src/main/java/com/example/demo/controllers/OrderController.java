package src.main.java.com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import src.main.java.com.example.demo.classes.OrderDB;
import src.main.java.com.example.demo.services.OrderService;

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
}
