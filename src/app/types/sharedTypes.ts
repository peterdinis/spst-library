export interface IGlobalCardProps{
	name: string;
	description: string;
	id: number | string;
	linkName: string;
	image?: string;
}

export interface IGlobalErrorProps {
	statusCode: string;
	message: string;
}


export interface IGlobalPaginationProps {
	page: number;
	nextCursor: number;
	handleFetchPreviousPage: (...args: unknown[]) => void;
	handleFetchNextPage: (...args: unknown[]) => void;
}

export interface ILongTextProps {
	text: string;
	maxLength: number;
}