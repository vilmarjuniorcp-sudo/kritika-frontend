import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthorRegistration } from "./pages/author-registration/author-registration";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthorRegistration],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kritika');
}
