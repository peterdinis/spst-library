"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Teacher = {
	id: string;
	name: string;
	lastName: string;
	userEmail: string;
};

export const columns: ColumnDef<Teacher>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Meno učiteľa/ky",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "lastName",
		header: "Priezvisko učiteľa/ky",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "userEmail",
		header: "Email učiteľa/ky",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
