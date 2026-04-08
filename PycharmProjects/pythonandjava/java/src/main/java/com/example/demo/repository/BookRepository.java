package com.example.demo.repository;

import com.example.demo.entity.BookDB;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BookRepository extends JpaRepository<BookDB, Long> {
    BookDB findByTitle(String title);
}