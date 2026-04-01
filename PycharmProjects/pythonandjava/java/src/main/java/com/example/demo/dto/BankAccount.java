package com.example.demo.dto;

import lombok.Data;

@Data
public class BankAccount {

    private String iban;
    private Double amount;
    private String bankName;
    private Double accountLimit;
}
