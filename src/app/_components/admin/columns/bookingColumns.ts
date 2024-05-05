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
		accessorKey: "bookName",
		header: "Meno knihy",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "from",
		header: "Požičaná od",
		enableSorting: true,
		enableGlobalFilter: true,
	},

	{
		accessorKey: "to",
		header: "Požičaná do",
		enableSorting: true,
		enableGlobalFilter: true,
	},

	{
		accessorKey: "userEmail",
		header: "Knihu má požičanú",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
