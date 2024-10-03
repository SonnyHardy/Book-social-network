package com.sonny.book.security;

import com.sonny.book.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

//@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl {//implements UserDetailsService {

    /*private final UserRepository userRepository;

    @Override
    @Transactional   // lorsqu'on load le user on load egalement ses roles ou authorities
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        return this.userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }*/
}
