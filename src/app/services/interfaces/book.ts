import { Chapter } from "./chapter";

export interface Book {
    id?: number,
    idAuthor?: number,
    name: string,
    description: string,
    chapters?: Chapter[]
}