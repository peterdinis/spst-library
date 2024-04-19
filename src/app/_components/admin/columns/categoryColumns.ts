"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Category } from "~/app/types/categoryTypes";

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
