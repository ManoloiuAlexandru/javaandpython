package src.main.java.com.example.demo.classes;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bank_accounts")
public class BankAccountDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String iban;

    @Column(unique = true, nullable = false)
    private Double amount;

    @Column(unique = true, nullable = false)
    private String bankName;

    @Column(unique = true, nullable = false)
    private Double limit;

}
