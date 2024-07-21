package com.sonny.book.user;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TokenRepository extends CrudRepository<Token, Integer> {

    Optional<Token> findByToken(String token);
}
