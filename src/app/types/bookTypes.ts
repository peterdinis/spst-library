import { IAuthor } from "./authorTypes";
import { Category } from "./categoryTypes";
import { Publisher } from "./publisherTypes";

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


export type IBookCard = Pick<IBook, 'id' | 'image' | 'name' | 'description'>