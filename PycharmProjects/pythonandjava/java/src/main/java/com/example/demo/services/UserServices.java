package src.main.java.com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.main.java.com.example.demo.classes.User;
import src.main.java.com.example.demo.classes.UserDB;
import src.main.java.com.example.demo.repository.UserRepository;
import src.main.java.com.example.demo.classes.Book;
import src.main.java.com.example.demo.repository.BookRepository;
import src.main.java.com.example.demo.classes.BookDB;

import java.util.List;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    public String addUser(User user) {
        UserDB userDB = new UserDB();
        userDB.setName(user.getName());
        userDB.setPassword(user.getPassword());
        userRepository.save(userDB);
        return "User added";
    }

    public List<UserDB> getAllUsers() {
        return userRepository.findAll();
    }

    public String buyBook(Book book, String username) {
        UserDB logged = null;
        for (UserDB userDB : userRepository.findAll()) {
            if (userDB.getName().equals(username)) {
                logged = userDB;
                break;
            }
        }
        if (logged == null) {
            return "User not found";
        }

        for (BookDB bookStore : bookRepository.findAll()) {
            if (book.getTitle().equals(bookStore.getTitle())) {
                logged.getBooks().add(bookStore);
                bookStore.setSold(bookStore.getSold() + 1);
                userRepository.save(logged);
                return "Success";
            }
        }
        return "Book not found";
    }
}
