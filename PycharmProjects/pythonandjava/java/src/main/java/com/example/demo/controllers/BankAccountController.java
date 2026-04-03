package src.main.java.com.example.demo.controllers;

import com.example.demo.request.BankAccountRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import src.main.java.com.example.demo.services.BankAccountServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Bank Accounts", description = "Operations related to bank accounts")
public class BankAccountController {

    @Autowired
    private BankAccountServices bankAccountService;

    @PostMapping("/add_bank_account")
    @Operation(summary = "Add a new bank account to the DB")
    public String buyBook(@RequestBody BankAccountRequest bankAccountRequest) {
        return bankAccountService.addBankAccount(bankAccountRequest.getBankAccount(), bankAccountRequest.getToken());
    }


}
