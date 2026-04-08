package com.example.demo.repository;

import com.example.demo.entity.BankAccountDB;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BankAccountRepository extends JpaRepository<BankAccountDB, Long> {}