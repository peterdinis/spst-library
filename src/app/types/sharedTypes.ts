import { BookType } from "./bookTypes";

type GlobalExtendedProps = {
	linkName: string;
	image?: string;
};

export type IGlobalCardType = GlobalExtendedProps & BookType;
