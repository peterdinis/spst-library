export interface ICreateCategory {
	name: string;
	description: string;
}

export interface Category extends ICreateCategory {
	id: string;
}
