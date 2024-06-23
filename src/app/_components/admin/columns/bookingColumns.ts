"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Booking } from "~/app/types/tableTypes";

export const columns: ColumnDef<Booking>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "bookName",
		header: "Meno knihy",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "from",
		header: "Požičaná od",
		enableSorting: true,
		enableGlobalFilter: true,
	},

	{
		accessorKey: "to",
		header: "Požičaná do",
		enableSorting: true,
		enableGlobalFilter: true,
	},

	{
		accessorKey: "userEmail",
		header: "Knihu má požičanú",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
