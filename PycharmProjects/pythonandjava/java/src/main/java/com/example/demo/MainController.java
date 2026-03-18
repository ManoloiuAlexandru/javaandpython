package com.example.demo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class MainController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of("message", "We need to farm m+ gear");
    }
}