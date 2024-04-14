import { IBook } from "./bookTypes";

export interface IAuthor {
	id: number;
	name: string;
	deathYear?: string;
	birthYear: string;
	description: string;
	litPeriod: string;
	totalBooks: number;
	authorImage: string;
	books?: IBook;
}

export interface SelectAuthor {
	id: number;
	name: string;
}
