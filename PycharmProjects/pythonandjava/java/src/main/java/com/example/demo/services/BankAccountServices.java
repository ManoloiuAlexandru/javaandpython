package com.example.demo.services;

import com.example.demo.dto.User;
import com.example.demo.entity.BankAccountDB;
import com.example.demo.entity.UserDB;
import com.example.demo.repository.BankAccountRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dto.BankAccount;

import java.util.List;

@Service
public class BankAccountServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    public String addBankAccount(BankAccount bankAccount, String token) {
        BankAccountDB bankAccountDB = new BankAccountDB();
        bankAccountDB.setBankName(bankAccount.getBankName());
        bankAccountDB.setIban(bankAccount.getIban());
        bankAccountDB.setAmount(bankAccount.getAmount());
        bankAccountDB.setAccountLimit(bankAccount.getAccountLimit());
        for (UserDB user : userRepository.findAll()) {
            if (user.getName().equals(token)) {
                user.getBankAccounts().add(bankAccountDB);
                userRepository.save(user);
            }
        }
        return "Success";
    }

    public List<BankAccountDB> getAllAccounts() {
        return bankAccountRepository.findAll();
    }
}
