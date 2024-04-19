import { IBook } from "./bookTypes";

export interface Publisher {
	id: number;
	name: string;
	image: string;
	description: string;
	createdDated: Date | string;
	isActive: boolean;
	books?: IBook;
	bossName: string;
}
