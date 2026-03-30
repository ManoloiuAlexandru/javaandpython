package src.main.java.com.example.demo.classes;

import lombok.Data;

@Data
public class Book {
    private String title;
    private String author;
    private int year;
    private int pages;
    private String genre;
    private double price;
    private int sold;
}
