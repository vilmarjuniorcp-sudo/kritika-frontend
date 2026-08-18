import { Routes } from '@angular/router';
import { AuthorPage } from './pages/author-page/author-page';
import { BookPage } from './pages/book-page/book-page';
import { ChapterPage } from './pages/chapter-page/chapter-page';

export const routes: Routes = [
    {
        path: 'author/:id',
        component: AuthorPage
    },
    {
        path: 'author/:authorId/book/:id',
        component: BookPage
    },
    {
        path: 'author/:authorId/book/:bookId/chapter/:id',
        component: ChapterPage
    }
];
