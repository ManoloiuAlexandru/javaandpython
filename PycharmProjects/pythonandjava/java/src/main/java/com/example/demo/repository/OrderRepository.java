package com.example.demo.repository;

import com.example.demo.entity.OrderDB;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<OrderDB, Long> {}