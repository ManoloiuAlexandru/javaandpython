package src.main.java.com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import src.main.java.com.example.demo.classes.OrderDB;

public interface OrderRepository extends JpaRepository<OrderDB, Long> {}