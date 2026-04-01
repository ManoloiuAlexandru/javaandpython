package com.example.demo.dto;
import lombok.Data;


import java.util.List;

@Data
public class User {
    private String name;
    private String password;
    private List<Book> books;
}
