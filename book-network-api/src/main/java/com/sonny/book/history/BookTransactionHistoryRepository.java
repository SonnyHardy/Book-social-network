package com.sonny.book.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Integer> {

    @Query("select history from BookTransactionHistory history where history.userId = :userId")
    Page<BookTransactionHistory> findAllBorrowedBooks(Pageable pageable, String userId);

    @Query("select history from BookTransactionHistory history where history.book.createdBy = :userId")
    Page<BookTransactionHistory> findAllReturnedBooks(Pageable pageable, String userId);

    @Query("select (count(*) > 0) as isBorrowed from BookTransactionHistory bookTransactionHistory " +
            "where bookTransactionHistory.userId = :userId" +
            " and bookTransactionHistory.book.id = :bookId " +
            "and bookTransactionHistory.returnApproved = false")
    boolean isAlreadyBorrowedByUser(int bookId, String userId);

    @Query("select transaction from BookTransactionHistory transaction " +
            "where transaction.userId = :userId " +
            "and transaction.book.id = :bookId " +
            "and transaction.returned = false " +
            "and transaction.returnApproved = false ")
    Optional<BookTransactionHistory> findByBookIdAndUserId(int bookId, String userId);

    @Query("select transaction from BookTransactionHistory transaction " +
            "where transaction.book.createdBy = :ownerId " +
            "and transaction.book.id = :bookId " +
            "and transaction.returned = true " +
            "and transaction.returnApproved = false ")
    Optional<BookTransactionHistory> findByBookIdAndOwnerId(int bookId, String ownerId);
}
