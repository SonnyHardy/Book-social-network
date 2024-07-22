package com.sonny.book.book;

import com.sonny.book.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "books")
@AllArgsConstructor
@Tag(name = "Book")
public class BookController {

    private final BookService bookService;

    @PostMapping
    public ResponseEntity<Integer> saveBook (@Valid @RequestBody BookRequest request, Authentication connectedUser){
        return ResponseEntity.ok(bookService.saveBook(request, connectedUser));
    }

    @GetMapping(path = "{book-id}")
    public ResponseEntity<BookResponse> findBookById(@PathVariable(name = "book-id") int bookId) {
        return ResponseEntity.ok(bookService.findBookById(bookId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<BookResponse>> findAllBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.findAllBooks(page, size, connectedUser));
    }

    @GetMapping(path = "/owner")
    public ResponseEntity<PageResponse<BookResponse>> findAllBooksByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(bookService.findAllBooksByOwner(page, size, connectedUser));    }

}
