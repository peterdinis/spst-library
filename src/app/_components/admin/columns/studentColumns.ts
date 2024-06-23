"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Student } from "~/app/types/tableTypes";

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
