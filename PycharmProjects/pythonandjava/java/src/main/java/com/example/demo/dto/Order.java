package com.example.demo.dto;

import lombok.Data;

import java.util.List;

@Data
public class Order {
    private List<BookOrder> books;
    private String username;
    private Double total;
    private String status;
}