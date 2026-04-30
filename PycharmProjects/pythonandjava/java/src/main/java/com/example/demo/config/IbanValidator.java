package com.example.demo.config;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class IbanValidator implements ConstraintValidator<Iban, String> {


    @Override
    public boolean isValid(String value,
                           ConstraintValidatorContext context) {
        System.out.println("miau miau miau ");
        return value.contains("cartof");
    }
}
