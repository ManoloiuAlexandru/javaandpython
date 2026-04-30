package com.example.demo.dto;

import com.example.demo.config.Iban;

import lombok.Data;
import lombok.NonNull;

@Data
public class BankAccount {

    @Iban
    private String iban;
    private Double amount;
    private String bankName;
    private Double accountLimit;
}
