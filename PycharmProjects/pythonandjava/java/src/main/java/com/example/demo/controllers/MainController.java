package com.example.demo.controllers;

import java.util.Map;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Home", description = "The home page")
public class MainController {

    @GetMapping("/")
    @Operation(summary = "Returns the welcome message")
    public Map<String, String> home() {
        return Map.of("message", "Welcome to Personal Library");
    }

}
