"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Category = {
	id: string;
	name: string;
	description: string;
};

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Meno kategórie",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "description",
		header: "Popis kategórie",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
