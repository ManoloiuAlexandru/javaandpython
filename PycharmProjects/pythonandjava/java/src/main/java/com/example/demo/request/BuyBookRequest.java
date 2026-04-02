package com.example.demo.request;

import com.example.demo.dto.Book;
import lombok.Data;

@Data
public class BuyBookRequest {
    private Book book;
    private String username;
}