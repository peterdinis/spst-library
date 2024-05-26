"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Author = {
	id: string;
	name: string;
	description: string;
	totalBooks: number;
};

export const columns: ColumnDef<Author>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Meno autora/ky",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "description",
		header: "Popis",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "totalBooks",
		header: "Celkový počet kníh",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
