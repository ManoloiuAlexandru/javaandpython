package src.main.java.com.example.demo.classes;

import src.main.java.com.example.demo.classes.BookDB;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "users")
public class UserDB {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @OneToMany
    @JoinColumn(name = "id_book")
    private List<BookDB> books;
}
