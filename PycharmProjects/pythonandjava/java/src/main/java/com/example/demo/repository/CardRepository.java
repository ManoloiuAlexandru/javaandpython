package src.main.java.com.example.demo.repository;


import src.main.java.com.example.demo.classes.CardDB;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<CardDB,Long> {
}
