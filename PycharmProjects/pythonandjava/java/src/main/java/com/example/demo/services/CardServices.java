package src.main.java.com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dto.Card;
import src.main.java.com.example.demo.classes.BankAccountDB;
import src.main.java.com.example.demo.repository.BankAccountRepository;
import src.main.java.com.example.demo.classes.CardDB;

@Service
public class CardServices {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    public String addCard(Card card, String token) {

        for (BankAccountDB bankAccountDB : bankAccountRepository.findAll()) {
            if (bankAccountDB.getIban().equals(token)) {
                CardDB cardDB = new CardDB();
                cardDB.setCardNumber(card.getCardNumber());
                cardDB.setCvv(card.getCvv());
                cardDB.setType(card.getType());
                cardDB.setName(card.getName());
                bankAccountDB.getCardDB().add(cardDB);
                bankAccountRepository.save(bankAccountDB);
            }
        }
        return "Success";
    }
}
