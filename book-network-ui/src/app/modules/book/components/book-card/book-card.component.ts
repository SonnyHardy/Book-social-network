import {Component, Input} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {

  private _book: BookResponse = {};
  private _manage: boolean = false;
  private _bookCover: string | undefined;


  get book(): BookResponse {
    return this._book;
  }

  @Input()
  set book(value: BookResponse) {
    this._book = value;
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64, ' + this._bookCover;
    }
    return 'https://images.unsplash.com/photo-1725615357444-6123528686cf?ixid=M3w2NTUxODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjY2NzM3MDZ8&ixlib=rb-4.0.3';
  }



  onShowDetails() {

  }

  onBorrow() {

  }

  onAddToWaitingList() {

  }

  onEdit() {

  }

  onShare() {

  }

  onArchive() {

  }
}
