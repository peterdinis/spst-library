"use client";

import { FC, ReactNode } from "react";
import { Button } from "~/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetTrigger,
} from "~/components/ui/sheet";

type BtnVariants =
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link";

interface ISheetHelperProps {
	children?: ReactNode;
	title: string;
	secondTitle: string;
	variantProp: BtnVariants;
}

const SheetHelper: FC<ISheetHelperProps> = ({
	children,
	title,
	secondTitle,
	variantProp,
}) => {
	return (
		<Sheet>
			<SheetTrigger>
				<Button variant={variantProp} size="lg">
					{title}
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="text-2xl p-5 font-bold">
						{secondTitle}
					</SheetTitle>
					<SheetDescription>{children}</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default SheetHelper;
