"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Publisher = {
	id: string;
	bookName: string;
	from: string | Date;
	to: string | Date;
	isReturned: boolean;
	isExtended: boolean;
	borrowerEmail: string;
};

export const columns: ColumnDef<Publisher>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Meno vydavateľstva",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "description",
		header: "Popis vydavateľstva",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
