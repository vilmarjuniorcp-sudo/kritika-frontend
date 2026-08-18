import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../interfaces/author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {

  private readonly API = 'http://localhost:8080/authors'

  constructor (private http: HttpClient) {}

  saveAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.API,author);
  }

  getAuthor(id: number): Observable<Author> {
    const url = `${this.API}/${id}`;
    return this.http.get<Author>(url);
  }

  editAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(this.API, author);
  }

  deleteAuthor(id: number) {
    const url = `${this.API}/${id}`;
    this.http.delete(url);
  }

}
