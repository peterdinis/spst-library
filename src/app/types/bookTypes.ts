import { Category } from "./categoryTypes";

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
    publisher: any;
    author: any;
}