"use client";

import type { FC, ReactNode } from "react";
import { Button } from "~/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
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
					<SheetTitle>{secondTitle}</SheetTitle>
					<SheetDescription>{children}</SheetDescription>
					<hr />
					<SheetDescription className="text-center text-xl mt-5 font-bold text-red-600">
						Info pred upravovaním
					</SheetDescription>
					<br />
					<SheetDescription className="mt-4 p-4 text-xl font-bold">
						Ak mám vyvorenú kategóriu <q>abc</q> a kategória <q>abc</q>
						referencuje sa v knihe <q>Abc</q> nemôžeme zmazať kategóiu
						<q>Abc</q>. Najprv musíte v knihe <q>Abc</q> nahradiť kategóriu
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default SheetHelper;
