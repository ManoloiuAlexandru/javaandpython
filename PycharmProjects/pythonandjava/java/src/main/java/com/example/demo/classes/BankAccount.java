package src.main.java.com.example.demo.classes;

import lombok.Data;

@Data
public class BankAccount {

    private String iban;
    private Double amount;
    private String bankName;
    private Double accountLimit;
}
