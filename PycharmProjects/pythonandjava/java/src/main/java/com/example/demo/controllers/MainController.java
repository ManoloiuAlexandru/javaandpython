package src.main.java.com.example.demo.controllers;

import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
public class MainController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of("message", "Welcome to Personal Library");
    }

}
