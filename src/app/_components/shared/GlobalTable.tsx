"use client";

import { useState } from "react";
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { Ghost } from "lucide-react";
import { DataTableProps } from "~/app/types/sharedTypes";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
} from "~/components/ui/pagination";

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	const table = useReactTable({
		data,
		columns,
		state: {
			pagination: {
				pageIndex,
				pageSize,
			},
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className="rounded-md border mt-5">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={
									row.getIsSelected() ? "selected" : undefined
								}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
							>
								<Ghost className="h-8 w-8 mx-auto" />
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<button
							onClick={() =>
								setPageIndex(Math.max(0, pageIndex - 1))
							}
							disabled={pageIndex === 0}
						>
							Previous
						</button>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink>
							Stránka {pageIndex + 1} z {table.getPageCount()}
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<button
							onClick={() =>
								setPageIndex(
									Math.min(
										pageIndex + 1,
										table.getPageCount() - 1,
									),
								)
							}
							disabled={pageIndex >= table.getPageCount() - 1}
						>
							Next
						</button>
					</PaginationItem>
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 50].map((size) => (
							<option key={size} value={size}>
								Show {size}
							</option>
						))}
					</select>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
