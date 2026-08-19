import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthorService } from '../../services/authors/author-service';
import { BookService } from '../../services/books/book-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Author } from '../../services/interfaces/author';
import { Book } from '../../services/interfaces/book';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-author-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './author-page.html',
  styleUrl: './author-page.css',
})
export class AuthorPage implements OnInit {

  id = '';
  author = signal<Author>({
    name: '',
    about: ''
  });
  books = signal<Book[]>([]);
  edit = false;
  authorForm!: FormGroup;
  private authorService = inject(AuthorService)
  private bookService = inject(BookService)
  private activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.formInit();
    this.idInit();
    this.loadAuthor();
    this.loadBooks();
  }

  idInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    }
  }

  formInit() {
    this.authorForm = new FormGroup({
      name: new FormControl('',Validators.required),
      about: new FormControl('')
    })
  }

  loadAuthor() {
    this.authorService.getAuthor(parseInt(this.id)).subscribe((author) => {
      console.log('Recebi:', author);
      this.author.set(author);
      this.authorForm.patchValue(author);
      console.log('Depois da atribuição:', this.author);
    })
  }

  loadBooks() {
    this.bookService.getBooksByAuthor(parseInt(this.id)).subscribe((bookList) => {
      console.log('Recebi: ',bookList);
      this.books.set(bookList.content);
      console.log('Depois da atribucao: ', this.books);
    })
  }

  editButtonTrue() {
    this.edit = true;
  }

  submitAuthorForm() {
    const author = this.authorForm.value;
    author.id = this.author().id;
    this.editAuthor(author);
    this.edit = false;
  }

  editAuthor(author: Author) {
    this.authorService.editAuthor(author).subscribe(() => {
      this.loadAuthor();
      alert('Autor editado!');
    })
  }

}
