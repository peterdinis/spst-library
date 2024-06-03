"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Teacher } from "~/app/types/tableTypes";

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
