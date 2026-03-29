package src.main.java.com.example.demo.controllers;

import src.main.java.com.example.demo.classes.Book;
import src.main.java.com.example.demo.classes.BookDB;
import src.main.java.com.example.demo.services.BookServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class BookController {

    @Autowired
    private BookServices bookServices;

    @PostMapping("/add_book")
    public Map<String, String> addBook(@RequestBody Book book) {
        return Map.of("message", bookServices.addBook(book));
    }

    @GetMapping("/get_most_expensive")
    public BookDB getMostExpensive(){
        return bookServices.getExpensive();
    }
    @GetMapping("/books")
    public List<BookDB> getAllBooks() {
        return bookServices.getAllBooks();
    }

    @PostMapping("/add_library")
    public Map<String, String> addBook(@RequestBody List<Book> library)
    {
        return Map.of("message",bookServices.addLibrary(library));
    }
}
