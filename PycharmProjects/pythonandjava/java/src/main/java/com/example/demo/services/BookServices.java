package com.example.demo.services;

import com.example.demo.entity.BookDB;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dto.Book;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        bookDB.setSold(book.getSold());
        bookDB.setTypeOfBook(book.getTypeOfBook());
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
//        return bookExp;
        List<BookDB> library = bookRepository.findAll();
        return library.stream().max(Comparator.comparingDouble(BookDB::getPrice)).orElse(null);
    }

    public BookDB getCheap() {
//        double minPrice = 999;
//        BookDB bookChp = null;
//        for (BookDB book : bookRepository.findAll()) {
//            if (book.getPrice() < minPrice) {
//                bookChp = book;
//                minPrice = book.getPrice();
//            }
//        }
//        return bookChp;
        List<BookDB> library = bookRepository.findAll();
        return library.stream().min(Comparator.comparingDouble(BookDB::getPrice)).orElse(null);
    }

    public BookDB getLongest() {
        double longestPg = 0;
        BookDB bookLongest = null;
        for (BookDB book : bookRepository.findAll()) {
            if (book.getPages() > longestPg) {
                bookLongest = book;
                longestPg = book.getPages();
            }
        }
        return bookLongest;
//        List<BookDB> library = bookRepository.findAll();
//        return library.stream().min(Comparator.comparingDouble(BookDB::getPrice)).orElse(null);
    }

    public BookDB getOldest() {
//        int oldest=2026;
//        BookDB oldBook=null;
//        for (BookDB book:bookRepository.findAll())
//        {
//            if (book.getYear()<oldest){
//                oldBook=book;
//                oldest=book.getYear();
//            }
//        }
//        return oldBook;
        return bookRepository.findAll().stream().min(Comparator.comparingDouble(BookDB::getYear)).orElse(null);
    }

    public BookDB getNewest() {
        return bookRepository.findAll().stream().max(Comparator.comparingDouble(BookDB::getYear)).orElse(null);
    }

    public Map<String, Integer> getMostGenre() {
        Map<String, Integer> genreApparition = new HashMap<>();

//        for (BookDB book : bookRepository.findAll()) {
//            if (genreApparition.containsKey(book.getGenre())) {
//                genreApparition.put(book.getGenre(), genreApparition.get(book.getGenre()) + 1);
//            } else {
//                genreApparition.put(book.getGenre(), 1);
//            }
//        }

        for (BookDB book : bookRepository.findAll()) {
            String genre = book.getGenre();
            genreApparition.put(genre, genreApparition.getOrDefault(genre, 0) + 1);
        }

        return genreApparition;
    }

    public BookDB getMostSold(){
        return bookRepository.findAll().stream().max(Comparator.comparingInt(BookDB::getSold)).orElse(null);
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

    public BookDB findBook(String title){
        return bookRepository.findByTitle(title);
    }
}
