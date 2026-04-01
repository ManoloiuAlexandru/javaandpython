package src.main.java.com.example.demo.dto;

import lombok.Data;
import src.main.java.com.example.demo.classes.Card;

@Data
public class CardRequest {
    private Card card;
    private String token;
}
