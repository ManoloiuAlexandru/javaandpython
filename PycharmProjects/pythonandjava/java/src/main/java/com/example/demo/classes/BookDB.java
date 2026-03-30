package src.main.java.com.example.demo.classes;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "books")
public class BookDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column
    private int year;

    @Column(nullable = false)
    private int pages;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private int sold;
}
