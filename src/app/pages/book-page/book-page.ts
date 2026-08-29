import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/books/book-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../services/interfaces/book';
import { NgClass } from "../../../../node_modules/@angular/common";

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './book-page.html',
  styleUrl: './book-page.css',
})
export class BookPage implements OnInit {

  bookForm!: FormGroup
  authorId = ''
  book = signal<Book>({
    name: '',
    description: ''
  })
  isNew = false
  private bookService = inject(BookService)
  private activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.formInit();
    if (id && id != 'new') {
      this.getBook(parseInt(id));
    } else {
      this.isNew = true;
    }
    this.authorIdInit();
  }

  authorIdInit() {
    const authorId = this.activatedRoute.snapshot.paramMap.get('authorId');
    if (authorId) {
      this.authorId = authorId;
    }
  }

  formInit() {
    this.bookForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    })
  }

  getBook(id: number) {
    this.bookService.getBook(id).subscribe((book) => {
      this.book.set(book);
      this.bookForm.patchValue(this.book());
    });
  }

  saveBook(newBook: Book) {
    this.bookService.saveBook(newBook).subscribe(() => {
      alert('Livro salvo!');
    })
  }

  editBook(newBook: Book) {
    this.bookService.editBook(newBook).subscribe(() => {
      alert('Livro editado!');
    })
  }

  submitForm() {
    const newBook = this.bookForm.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    newBook.id = id ? parseInt(id) : null;
    if (newBook.id) {
      this.editBook(newBook);
    } else {
      this.saveBook(newBook);
    }
  }

  deleteBook() {
    const id = this.book().id;
    if (id) {
      this.bookService.deleteBook(id);
      this.bookForm.reset();
      alert('Livro deletado!');
    }
  }
  
}
