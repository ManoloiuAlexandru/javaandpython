package src.main.java.com.example.demo.classes;
import src.main.java.com.example.demo.classes.Book;
import lombok.Data;


import java.util.List;

@Data
public class User {
    private String name;
    private String password;
    private List<Book> books;
}
