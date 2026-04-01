package src.main.java.com.example.demo.controllers;

import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.Book;
import src.main.java.com.example.demo.classes.BookDB;
import src.main.java.com.example.demo.services.BookServices;
import org.springframework.beans.factory.annotation.Autowired;

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
    public BookDB getMostExpensive() {
        return bookServices.getExpensive();
    }

    @GetMapping("/books")
    public List<BookDB> getAllBooks() {
        return bookServices.getAllBooks();
    }

    @PostMapping("/add_library")
    public Map<String, String> addBook(@RequestBody List<Book> library) {
        return Map.of("message", bookServices.addLibrary(library));
    }

    @GetMapping("/get_most_cheap")
    public BookDB getMostCheap() {
        return bookServices.getCheap();
    }

    @GetMapping("/get_longest_book")
    public BookDB getLongestBook() {
        return bookServices.getLongest();
    }

    @GetMapping("/get_oldest")
    public BookDB getOldestBook() {
        return bookServices.getOldest();
    }

    @GetMapping("/get_newest")
    public BookDB getNewestBook() {
        return bookServices.getNewest();
    }

    @GetMapping("/get_genres")
    public Map<String, Integer> getGenres() {
        return bookServices.getMostGenre();
    }

    @GetMapping("/get_most_sold")
    public BookDB getMostSold() {
        return bookServices.getMostSold();
    }

    @PostMapping("/find_book")
    public BookDB getBook(@RequestParam String title) {
        return bookServices.findBook(title);
    }
}
