package src.main.java.com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.main.java.com.example.demo.classes.User;
import src.main.java.com.example.demo.classes.UserDB;
import src.main.java.com.example.demo.repository.UserRepository;

import java.util.List;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    public String addUser(User user) {
        UserDB userDB = new UserDB();
        userDB.setName(user.getName());
        userDB.setPassword(user.getPassword());
        userRepository.save(userDB);
        return "User added";
    }

    public List<UserDB> getAllUsers(){
        return userRepository.findAll();
    }
}
