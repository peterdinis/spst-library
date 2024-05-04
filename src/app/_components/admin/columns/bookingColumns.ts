"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Booking = {
	id: string;
	bookName: string;
	from: string | Date;
	to: string | Date;
	isReturned: boolean;
	isExtended: boolean;
	userEmail: string;
};

export const columns: ColumnDef<Booking>[] = [
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
