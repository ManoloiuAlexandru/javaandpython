package src.main.java.com.example.demo.classes;

import lombok.Data;

@Data
public class Card {
    private String cardNumber;
    private String type;
    private String name;
    private int cvv;
}
