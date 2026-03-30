package src.main.java.com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import src.main.java.com.example.demo.classes.BookDB;

public interface BookRepository extends JpaRepository<BookDB, Long> {
    BookDB findByTitle(String title);
}