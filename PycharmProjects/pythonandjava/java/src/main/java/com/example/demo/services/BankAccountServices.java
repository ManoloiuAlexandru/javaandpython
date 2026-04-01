package src.main.java.com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.main.java.com.example.demo.classes.BankAccountDB;
import src.main.java.com.example.demo.classes.UserDB;
import com.example.demo.dto.BankAccount;

@Service
public class BankAccountServices {

    @Autowired
    private src.main.java.com.example.demo.repository.UserRepository userRepository;

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
}
