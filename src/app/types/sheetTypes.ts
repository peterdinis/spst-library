import { ReactNode } from "react";

export type BtnVariants =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

export interface ISheetHelperProps {
	children?: ReactNode;
	title: string;
	secondTitle: string;
	variantProp: BtnVariants;
}