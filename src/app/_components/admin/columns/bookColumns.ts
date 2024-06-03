"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Book } from "~/app/types/tableTypes";


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
