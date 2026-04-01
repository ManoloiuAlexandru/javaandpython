package com.example.demo.dto;

import lombok.Data;

@Data
public class CardRequest {
    private Card card;
    private String token;
}
