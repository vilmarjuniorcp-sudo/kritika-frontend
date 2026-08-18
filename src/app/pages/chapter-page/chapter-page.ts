import { Component, OnInit, signal } from '@angular/core';
import { Chapter } from '../../services/interfaces/chapter';
import { ChapterService } from '../../services/chapters/chapter-service';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/books/book-service';
import { Book } from '../../services/interfaces/book';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chapter-page',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './chapter-page.html',
  styleUrl: './chapter-page.css',
})
export class ChapterPage implements OnInit {

  bookId: string = ''
  chapter = signal<Chapter> ({
    name: '',
    content:''
  })
  book = signal<Book> ({
    name: '',
    description: ''
  })
  chapterForm!: FormGroup

  constructor(
    private chapterService: ChapterService,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formInit();
    console.log('Aqui');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
    if (bookId) {
      this.loadBook(parseInt(bookId));
    }
    if(id && id != 'new') {
      this.loadChapter(parseInt(id));
    }
  }

  loadChapter(id: number) {
    this.chapterService.getChapter(id).subscribe((chapter) => {
      this.chapter.set(chapter);
      this.chapterForm.patchValue(this.chapter());
    })
  }

  loadBook(id: number) {
    this.bookService.getBook(id).subscribe((book) => {
      this.book.set(book);
    })
  }

  formInit() {
    this.chapterForm = new FormGroup({
      name: new FormControl('', Validators.required),
      content: new FormControl('')
    })

  }

  saveChapter(newChapter: Chapter) {
    this.chapterService.saveChapter(newChapter).subscribe((chapter) => {
      alert('Capítulo salvo!');
    })
  }

  editChapter(newChapter: Chapter) {
    this.chapterService.editChapter(newChapter).subscribe((chapter) => {
      alert('Capítulo editado!');
    })
  }

  deleteChapter() {
    const id = this.chapter().id;
    if (id) {
      this.chapterService.deleteChapter(id);
      this.chapterForm.reset();
      alert('Capítulo deletado!');
    }
  }

  submitForm() {
    const newChapter = this.chapterForm.value;
    if (newChapter.id) {
      this.editChapter(newChapter);
    } else {
      this.saveChapter(newChapter);
    }
  }

}
