package src.main.java.com.example.demo.controllers;

import com.example.demo.request.BankAccountRequest;
import src.main.java.com.example.demo.services.BankAccountServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BankAccountController {

    @Autowired
    private BankAccountServices bankAccountService;

    @PostMapping("/add_bank_account")
    public String buyBook(@RequestBody BankAccountRequest bankAccountRequest) {
        return bankAccountService.addBankAccount(bankAccountRequest.getBankAccount(),bankAccountRequest.getToken());
    }


}
