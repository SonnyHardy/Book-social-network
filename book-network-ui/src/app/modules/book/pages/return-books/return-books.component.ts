import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {BookService} from "../../../../services/services/book.service";
import {FeedbackService} from "../../../../services/services/feedback.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-return-books',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.scss'
})
export class ReturnBooksComponent implements OnInit{

  returnedBooks: PageResponseBorrowedBookResponse = {};
  page: number = 0;
  size: number = 5;
  message: string = "";
  level: string = 'success';

  constructor(
    private bookService: BookService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit() {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedBooks = resp;
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllReturnedBooks();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page ++;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllReturnedBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.returnedBooks.totalPages as number - 1;
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if (!book.returned) {
      //this.level = 'error';
      //this.message = 'The book is not yet returned';
      this.toastrService.error('The book is not yet returned', '😥 Oups!!')
      return;
    }
    this.bookService.approveReturnBorrowedBook({
      "book-id": book.id as number
    }).subscribe({
      next: () => {
        this.toastrService.success('Book return approved', '👍 Done!');
        this.findAllReturnedBooks();
      }
    });
  }

}
