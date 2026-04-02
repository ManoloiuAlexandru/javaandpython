package com.example.demo.request;

import com.example.demo.dto.BookOrder;
import lombok.Data;

import java.util.List;

@Data
public class BuyBooksRequest {
    private List<BookOrder> books;
    private String username;
}