package com.example.demo.services;

import com.example.demo.dto.User;
import com.example.demo.entity.BankAccountDB;
import com.example.demo.entity.CardDB;
import com.example.demo.entity.UserDB;
import com.example.demo.repository.BankAccountRepository;
import com.example.demo.repository.CardRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import com.example.demo.dto.Card;

import java.util.ArrayList;
import java.util.List;


@Service
public class CardServices {

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    public String addCard(Card card, String token) {

        for (BankAccountDB bankAccountDB : bankAccountRepository.findAll()) {
            if (bankAccountDB.getIban().equals(token)) {
                CardDB cardDB = new CardDB();
                cardDB.setCardNumber(card.getCardNumber());
                cardDB.setCvv(card.getCvv());
                cardDB.setType(card.getType());
                cardDB.setName(card.getName());
                cardDB.setBankAccount(bankAccountDB);
                bankAccountDB.getCardDB().add(cardDB);
                bankAccountRepository.save(bankAccountDB);
            }
        }
        return "Success";
    }

    public List<CardDB> getAllCards()
    {
        return cardRepository.findAll();
    }

    public List<CardDB> getSpecificCards(String name){
        List<CardDB> allCards=new ArrayList<>();
        for (BankAccountDB bankAccountDB : userRepository.getByName(name).getBankAccounts()) {
            allCards.addAll(bankAccountDB.getCardDB());
        }
        return allCards;
    }

    public List<CardDB> getSpecificCardsFromBank(String name,String Iban)
    {
        for (BankAccountDB bankAccountDB:userRepository.getByName(name).getBankAccounts())
        {
            if (bankAccountDB.getIban().equals(Iban)) {
                return bankAccountDB.getCardDB();
            }
        }
        return null;
    }
}
