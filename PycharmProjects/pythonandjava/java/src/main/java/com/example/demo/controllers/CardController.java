package com.example.demo.controllers;

import com.example.demo.entity.CardDB;
import com.example.demo.request.CardRequest;
import com.example.demo.request.PaymentRequest;
import com.example.demo.services.CardServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardController {

    @Autowired
    private CardServices cardServices;

    @PostMapping("/add_card")
    public String buyBook(@RequestBody CardRequest cardRequest) {
        return cardServices.addCard(cardRequest.getCard(), cardRequest.getToken());
    }

//    @PostMapping("/get_cards")
//    public List<CardDB> getCards(@RequestBody )
}
