package src.main.java.com.example.demo.dto;

import src.main.java.com.example.demo.classes.BankAccount;
import lombok.Data;

@Data
public class BankAccountRequest {
    private BankAccount bankAccount;
    private String token;
}
