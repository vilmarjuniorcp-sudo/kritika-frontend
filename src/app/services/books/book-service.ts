import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { Observable } from 'rxjs';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  private readonly API = 'http://localhost:8080/books'

  constructor (private http: HttpClient) {}

  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API,book);
  }
  
  getBooksByAuthor(authorId: number): Observable<Page<Book>> {
    const url = `${this.API}/byAuthor/${authorId}`;
    return this.http.get<Page<Book>>(url);
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.API}/${id}`;
    return this.http.get<Book>(url);
  }

  editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.API, book);
  }

  deleteBook(id: number) {
    const url = `${this.API}/${id}`;
    this.http.delete(url);
  }

}
