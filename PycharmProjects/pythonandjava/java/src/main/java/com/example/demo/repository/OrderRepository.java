package com.example.demo.repository;

import com.example.demo.entity.OrderDB;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OrderRepository extends JpaRepository<OrderDB, Long> {
    List<OrderDB> findByUserDB_Name(String name);
}