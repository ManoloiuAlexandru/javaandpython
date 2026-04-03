package src.main.java.com.example.demo.classes;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import src.main.java.com.example.demo.classes.UserDB;
import src.main.java.com.example.demo.classes.BookOrderDB;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class OrderDB {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Double total;

    @ManyToOne
    @JoinColumn(name = "user_order_id")
    private UserDB userDB;

    @OneToMany(cascade = CascadeType.ALL)
    private List<BookOrderDB> items = new ArrayList<>();
}
