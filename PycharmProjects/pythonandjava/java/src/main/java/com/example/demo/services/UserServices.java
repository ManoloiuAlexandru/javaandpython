package src.main.java.com.example.demo.services;

import com.example.demo.dto.BookOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dto.User;
import src.main.java.com.example.demo.classes.UserDB;
import src.main.java.com.example.demo.repository.UserRepository;
import com.example.demo.dto.Book;
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

    public UserDB getUser(String name) {
        return userRepository.getByName(name);
    }
}
