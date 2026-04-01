package com.example.demo.dto;

import lombok.Data;

@Data
public class BankAccountRequest {
    private BankAccount bankAccount;
    private String token;
}
