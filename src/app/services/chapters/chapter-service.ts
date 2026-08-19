import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chapter } from '../interfaces/chapter';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {

  private readonly API = 'http://localhost:8080/chapters'
  private http = inject(HttpClient)

  getChapter(id: number): Observable<Chapter> {
    const url = `${this.API}/${id}`;
    return this.http.get<Chapter>(url);
  }

  saveChapter(chapter: Chapter): Observable<Chapter> {
    return this.http.post<Chapter>(this.API, chapter);
  }

  editChapter(chapter: Chapter): Observable<Chapter> {
    return this.http.put<Chapter>(this.API, chapter);
  }

  deleteChapter(id: number) {
    const url = `${this.API}/${id}`;
    this.http.delete(url);
  }

}
