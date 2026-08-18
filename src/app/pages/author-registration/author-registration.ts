import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../services/authors/author-service';

@Component({
  selector: 'app-author-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './author-registration.html',
  styleUrl: './author-registration.css',
})
export class AuthorRegistration implements OnInit{

  authorForm!: FormGroup

  constructor(
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.authorForm = new FormGroup({
      name: new FormControl('', Validators.required),
      about: new FormControl('')
    })
  }

  saveAuthor() {
    const newAuthor = this.authorForm.value;
    this.authorService.saveAuthor(newAuthor).subscribe(() => {
      this.authorForm.reset();
    })
  }

}
