package src.main.java.com.example.demo.dto;

import src.main.java.com.example.demo.classes.Book;
import lombok.Data;

@Data
public class BuyBookRequest {
    private Book book;
    private String username;
}