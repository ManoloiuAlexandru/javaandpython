package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "bank_accounts")
public class BankAccountDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String iban;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private Double accountLimit;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="card_number_account")
    @JsonBackReference
    private List<CardDB> cardDB;
}
