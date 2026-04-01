package src.main.java.com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import src.main.java.com.example.demo.classes.BankAccountDB;

public interface BankAccountRepository extends JpaRepository<BankAccountDB, Long> {}