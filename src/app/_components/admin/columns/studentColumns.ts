"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Student = {
	id: string;
	name: string;
	lastName: string;
	userEmail: string;
};

export const columns: ColumnDef<Student>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Meno študenta/ky",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "lastName",
		header: "Priezvisko študenta/ky",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "userEmail",
		header: "Email študenta/ky",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
