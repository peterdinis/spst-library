"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Role } from "~/app/types/authTypes";

export type User = {
	id: string;
	name: string;
	lastName: string;
	email: string;
	role: Role;
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
	{
		accessorKey: "lastName",
		header: "Priezvisko",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "email",
		header: "Email",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "role",
		header: "Rola",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
