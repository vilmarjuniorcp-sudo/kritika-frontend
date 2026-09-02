import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthorService } from '../../services/authors/author-service';
import { BookService } from '../../services/books/book-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Author } from '../../services/interfaces/author';
import { Book } from '../../services/interfaces/book';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AutoResize } from '../../directives/auto-resize';

@Component({
  selector: 'app-author-page',
  imports: [RouterLink, ReactiveFormsModule, AutoResize],
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
  isNew = false;
  edit = false;
  containerType = '';
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
    if (id && id != 'new') {
      this.id = id;
      this.containerType = 'display';
    } else {
      this.isNew = true;
      this.edit = true;
      this.containerType = 'new';
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
      this.author.set(author);
      this.authorForm.patchValue(author);
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
    this.containerType = 'edit';
  }

  submitAuthorForm() {
    const author = this.authorForm.value;
    author.id = this.author().id;
    this.editAuthor(author);
    this.edit = false;
    this.containerType = 'display';
  }

  editAuthor(author: Author) {
    this.authorService.editAuthor(author).subscribe(() => {
      this.loadAuthor();
      alert('Autor editado!');
    })
  }

}
