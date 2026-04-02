package com.example.demo.request;

import com.example.demo.dto.Card;
import lombok.Data;

@Data
public class CardRequest {
    private Card card;
    private String token;
}
