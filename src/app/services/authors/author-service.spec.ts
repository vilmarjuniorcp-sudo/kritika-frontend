import { TestBed } from '@angular/core/testing';

import { AuthorService } from './author-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Author } from '../interfaces/author';

describe('AuthorService', () => {
  let service: AuthorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search author by id', () => {
    const author: Author = {
      id: 1,
      name: 'Machado de Assis',
      about: 'Escritor brasileiro'
    }

    service.getAuthor(1).subscribe(response => {
      expect(response).toEqual(author);
    });

    const request = httpTestingController.expectOne(
      'http://localhost:8080/authors/1'
    );

    expect(request.request.method).toBe('GET');

    request.flush(author);

  });

  it('should save an author', () => {

    const author: Author = {
      id: 1,
      name: 'Machado de Assis',
      about: 'Escritor brasileiro'
    }

    service.saveAuthor(author).subscribe(response => {
      expect(response).toEqual(author);
    });

    const request = httpTestingController.expectOne(
      'http://localhost:8080/authors'
    );

    expect(request.request.method).toBe('POST');

    expect(request.request.body).toBe(author);

    request.flush(author);

  });

  it('should edit an author', () => {
    const author: Author = {
      id: 1,
      name: 'Machado de Assis',
      about: 'Grande escritor brasileiro'
    }

    service.editAuthor(author).subscribe(response => {
      expect(response).toEqual(author);
    });

    const request = httpTestingController.expectOne(
      'http://localhost:8080/authors'
    );

    expect(request.request.method).toBe('PUT');

    expect(request.request.body).toEqual(author);

    request.flush(author);

  });

  it('should delete an author', () => {
    service.deleteAuthor(1).subscribe();

    const request = httpTestingController.expectOne(
      'http://localhost:8080/authors/1'
    );

    expect(request.request.method).toBe('DELETE');

    request.flush(null);

  });

});
