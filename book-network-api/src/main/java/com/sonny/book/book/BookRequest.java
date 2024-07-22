package com.sonny.book.book;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record BookRequest(
        int id,

        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String title,

        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String authorName,

        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String isbn,

        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String synopsis,

        boolean shareable
) {

}
