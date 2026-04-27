package com.example.demo.request;

import com.example.demo.dto.Card;
import lombok.Data;

@Data
public class PaymentRequest {
    private Long cardId;
    private Long orderId;
}
