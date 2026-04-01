package src.main.java.com.example.demo.classes;

import src.main.java.com.example.demo.classes.BankAccountDB;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cards")
public class CardDB {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private int cvv;

    @Column(nullable = false)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bank_account")
    private BankAccountDB bankAccount;

}
