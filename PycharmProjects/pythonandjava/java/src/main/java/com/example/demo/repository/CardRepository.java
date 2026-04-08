package com.example.demo.repository;


import com.example.demo.entity.CardDB;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<CardDB,Long> {
}
