package src.main.java.com.example.demo.services;

import com.example.demo.dto.BookOrder;
import com.example.demo.dto.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.main.java.com.example.demo.classes.BookOrderDB;
import src.main.java.com.example.demo.repository.OrderRepository;
import com.example.demo.dto.BankAccount;
import src.main.java.com.example.demo.classes.OrderDB;
import src.main.java.com.example.demo.repository.UserRepository;
import src.main.java.com.example.demo.classes.UserDB;
import src.main.java.com.example.demo.classes.BookDB;
import src.main.java.com.example.demo.repository.BookRepository;

import java.util.ArrayList;
import java.util.List;

import src.main.java.com.example.demo.repository.CardRepository;
import src.main.java.com.example.demo.classes.BankAccountDB;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private BookRepository bookRepository;

    public String createOrder(Order order) {
        if (userRepository.getByName(order.getUsername()) != null) {
            OrderDB orderDB = new OrderDB();
            orderDB.setTotal(order.getTotal());
            orderDB.setUserDB(userRepository.getByName(order.getUsername()));
            for (BookOrder bookOrder : order.getBooks()) {
                BookOrderDB bookOrderDB = new BookOrderDB();
                bookOrderDB.setBookId(bookOrder.getBookId());
                bookOrderDB.setQuantity(bookOrder.getQuantity());
                orderDB.getItems().add(bookOrderDB);
                orderDB.setStatus("Unpaid");
            }
            orderRepository.save(orderDB);
            return "Success";
        }
        return "Error user not found";
    }

    public Boolean validateCard(Long orderId, Long cardId, String username) {
        OrderDB orderDB = orderRepository.findById(orderId).get();
        Double total = orderDB.getTotal();
        BankAccountDB bankAccount = cardRepository.findById(cardId).get().getBankAccount();
        if (bankAccount.getAmount() >= total &&
                userRepository.getByName(username).getBankAccounts().contains(bankAccount)) {
            bankAccount.setAmount(bankAccount.getAmount() - total);
            orderDB.setStatus("Paid");
            orderRepository.save(orderDB);
            return true;
        }
        orderDB.setStatus("Rejected");
        orderRepository.save(orderDB);
        return false;

    }

    public String buyBooks(Long orderId, Long cardId, String username) {
        UserDB logged = null;
        for (UserDB userDB : userRepository.findAll()) {
            if (userDB.getName().equals(username)) {
                logged = userDB;
                break;
            }
        }
        if (logged == null) {
            return "User not found";
        } else if (validateCard(orderId, cardId, username)) {
            for (BookOrderDB bookToBuy : orderRepository.findById(orderId).get().getItems()) {
                for (BookDB bookStore : bookRepository.findAll()) {
                    if (bookToBuy.getBookId().equals(bookStore.getId())) {
                        logged.getBooks().add(bookStore);
                        bookStore.setSold(bookStore.getSold() + bookToBuy.getQuantity());
                        userRepository.save(logged);
                        return "Success";
                    }
                }
            }
            return "Book not found";
        }
        return "Error";
    }

}
