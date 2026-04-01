package src.main.java.com.example.demo.controllers;

import src.main.java.com.example.demo.dto.CardRequest;
import src.main.java.com.example.demo.services.CardServices;
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


}
