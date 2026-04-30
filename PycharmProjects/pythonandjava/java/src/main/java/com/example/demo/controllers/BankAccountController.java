package com.example.demo.controllers;

import com.example.demo.entity.BankAccountDB;
import com.example.demo.request.BankAccountRequest;
import com.example.demo.services.BankAccountServices;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@Tag(name = "Bank Accounts", description = "Operations related to bank accounts")
public class BankAccountController {

    @Autowired
    private BankAccountServices bankAccountService;

    @PostMapping("/add_bank_account")
    @Operation(summary = "Add a new bank account to the DB")
    public String buyBook(@Valid @RequestBody BankAccountRequest bankAccountRequest, Authentication authentication) {
        return bankAccountService.addBankAccount(bankAccountRequest.getBankAccount(),authentication.getName());
    }

    @GetMapping("/all_bank_accounts")
    @Operation(summary = "Get all bank accounts")
    public List<BankAccountDB> getBankAccount(Authentication authentication)
    {
        return bankAccountService.getAllAccounts();
    }

    @PostMapping("/get_bank_accounts")
    @Operation(summary = "Get all the bank accounts of a user")
    public List<BankAccountDB> getBankAccounts(Authentication authentication)
    {
        return bankAccountService.getBankAccounts(authentication.getName());
    }
}