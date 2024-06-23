export type Author = {
	id: string;
	name: string;
	description: string;
	totalBooks: number;
};

export type Book = {
	id: string;
	name: string;
	description: string;
	isAvaiable: boolean;
	itemsInStock: number;
};

export type Booking = {
	id: string;
	bookName: string;
	from: string | Date;
	to: string | Date;
	isReturned: boolean;
	isExtended: boolean;
	userEmail: string;
};

export type Publisher = {
	id: string;
	name: string;
	description: string;
};

export type Student = {
	id: string;
	name: string;
	lastName: string;
	userEmail: string;
};

export type Teacher = {
	id: string;
	name: string;
	lastName: string;
	userEmail: string;
};
