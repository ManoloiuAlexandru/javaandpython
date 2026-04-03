package src.main.java.com.example.demo.classes;

import com.fasterxml.jackson.annotation.JsonBackReference;
import src.main.java.com.example.demo.classes.UserDB;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "book_orders")
public class BookOrderDB {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookId;

    private Integer quantity;

}
