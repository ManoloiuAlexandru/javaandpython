package src.main.java.com.example.demo.services;

import src.main.java.com.example.demo.classes.BookDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.main.java.com.example.demo.classes.Book;
import src.main.java.com.example.demo.repository.BookRepository;

import java.util.Comparator;
import java.util.List;

@Service
public class BookServices {

    @Autowired
    private BookRepository bookRepository;

    public String addBook(Book book) {
        BookDB bookDB = new BookDB();
        bookDB.setTitle(book.getTitle());
        bookDB.setAuthor(book.getAuthor());
        bookDB.setYear(book.getYear());
        bookDB.setPages(book.getPages());
        bookDB.setGenre(book.getGenre());
        bookDB.setPrice(book.getPrice());
        bookRepository.save(bookDB);
        return "Book added";
    }

    public BookDB getExpensive() {
//        double maxPrice = 0;
//        BookDB bookExp = null;
//        for (BookDB book : bookRepository.findAll()) {
//            if (book.getPrice() > maxPrice) {
//                bookExp = book;
//                maxPrice = book.getPrice();
//            }
//        }
        List<BookDB> library=bookRepository.findAll();
        return library.stream().max(Comparator.comparingDouble(BookDB::getPrice)).orElse(null);
    }

    public String addLibrary(List<Book> library) {
        for (Book book : library) {
            addBook(book);
        }
        return "Done";
    }

    public List<BookDB> getAllBooks() {
        return bookRepository.findAll();
    }
}
