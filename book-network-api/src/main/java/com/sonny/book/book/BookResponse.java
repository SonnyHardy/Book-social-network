package com.sonny.book.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {

    private int id;
    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String createdBy;
    private byte[] cover;
    private double rate;
    private boolean archived;
    private boolean shareable;
}
