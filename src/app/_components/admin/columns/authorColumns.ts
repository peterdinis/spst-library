"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Author } from "~/app/types/tableTypes";

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
