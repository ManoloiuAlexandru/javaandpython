package com.example.demo.services;

import com.example.demo.entity.UserDB;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

         UserDB user = userRepository.getByName(username);

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getName())
                .password(user.getPassword())   // BCrypt hash
                .authorities("USER")
                .build();
    }
}