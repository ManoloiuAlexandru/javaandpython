package src.main.java.com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import src.main.java.com.example.demo.classes.UserDB;

public interface UserRepository extends JpaRepository<UserDB, Long> {
    boolean existsByName(String name);
}