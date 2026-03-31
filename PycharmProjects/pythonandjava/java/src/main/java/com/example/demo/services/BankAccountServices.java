package src.main.java.com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.main.java.com.example.demo.services.UserServices;
import src.main.java.com.example.demo.classes.BankAccountDB;
import src.main.java.com.example.demo.classes.UserDB;
import src.main.java.com.example.demo.classes.BankAccount;

@Service
public class BankAccountServices {

    @Autowired
    private UserServices userServices;

    public String addBankAccount(BankAccount bankAccount, String token){
        BankAccountDB bankAccountDB=new BankAccountDB();
        bankAccountDB.setBankName(bankAccount.getBankName());
        bankAccountDB.setIban(bankAccount.getIban());
        bankAccountDB.setAmount(bankAccount.getAmount());
        bankAccountDB.setLimit(bankAccount.getLimit());

        for (UserDB user:userServices.getAllUsers())
        {
            if (user.getName().equals(token)){
                user.getBankAccounts().add(bankAccountDB);
            }
        }
        return "Success";
    }
}
