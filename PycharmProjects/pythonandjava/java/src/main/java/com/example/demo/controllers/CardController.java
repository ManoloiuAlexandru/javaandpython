package com.example.demo.controllers;

import com.example.demo.dto.CardsFromBank;
import com.example.demo.entity.CardDB;
import com.example.demo.request.CardRequest;
import com.example.demo.request.PaymentRequest;
import com.example.demo.services.CardServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CardController {

    @Autowired
    private CardServices cardServices;

    @PostMapping("/add_card")
    public String buyBook(@RequestBody CardRequest cardRequest) {
        return cardServices.addCard(cardRequest.getCard(), cardRequest.getToken());
    }

    @GetMapping("/get_cards")
    public List<CardDB> getCards(Authentication authentication)
    {
        return cardServices.getAllCards();
    }

    @PostMapping("/get_cards_of_user")
    public List<CardDB> getSpecificCards(Authentication authentication)
    {
        return cardServices.getSpecificCards(authentication.getName());
    }

    @PostMapping("/get_cards_of_bank_account")
    public List<CardDB> getSpecificCardFromBank(@RequestBody CardsFromBank cardsFromBank, Authentication authentication)
    {
        return cardServices.getSpecificCardsFromBank(authentication.getName(),cardsFromBank.getIban());
    }
}
