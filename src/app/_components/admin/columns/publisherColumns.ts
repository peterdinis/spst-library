"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Publisher } from "~/app/types/tableTypes";

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
