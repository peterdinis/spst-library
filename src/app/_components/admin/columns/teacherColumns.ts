"use client";

import { ColumnDef } from "@tanstack/react-table";

export type User = {
	id: string;
	name: string;
};

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Meno",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
