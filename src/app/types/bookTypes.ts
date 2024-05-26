import type { IAuthor } from "./authorTypes";
import type { Category } from "./categoryTypes";
import type { Publisher } from "./publisherTypes";

export interface IBook {
	id: number;
	name: string;
	description: string;
	image: string;
	year: string | Date;
	pages: number;
	isAvaiable: boolean;
	itemsInStock: number;
	category: Category;
	publisher: Publisher;
	author: IAuthor;
}

export type IBookCard = Pick<IBook, "id" | "image" | "name" | "description">;
