"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Book = {
	id: string;
	name: string;
	description: string;
	isAvaiable: boolean;
	itemsInStock: number;
};

const booleanCellRenderer = (value: boolean) => (value ? "Ano" : "Nie");

export const columns: ColumnDef<Book>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Meno knihy",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "description",
		header: "Popis knihy",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "isAvaiable",
		header: "Je dostupná",
		enableSorting: true,
		enableGlobalFilter: true,
		cell: ({ getValue }) => booleanCellRenderer(getValue<boolean>()),
	},
	{
		accessorKey: "itemsInStock",
		header: "Počet kusov",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
