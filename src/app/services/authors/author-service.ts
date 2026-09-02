import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Author } from '../interfaces/author';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {

  private readonly API = `${environment.apiUrl}/authors`
  private http = inject(HttpClient)

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

  deleteAuthor(id: number): Observable<void> {
    const url = `${this.API}/${id}`;
    return this.http.delete<void>(url);
  }

}
