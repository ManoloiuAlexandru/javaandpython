package com.example.demo.dto;

import lombok.Data;

@Data
public class BuyBookRequest {
    private Book book;
    private String username;
}