"use client";

import type { FC } from "react";
import type { IGlobalPaginationProps } from "~/app/types/sharedTypes";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "~/components/ui/pagination";

const GlobalPagination: FC<IGlobalPaginationProps> = ({
	page,
	nextCursor,
	handleFetchNextPage,
	handleFetchPreviousPage,
}: IGlobalPaginationProps) => {
	return (
		<div className="mt-5">
			<Pagination className="mt-5">
				<PaginationContent className="flex flex-wrap">
					{page <= 0 ? (
						<PaginationItem>
							<PaginationPrevious
								style={{
									pointerEvents: "none",
								}}
								href="#"
								onClick={handleFetchPreviousPage}
							/>
						</PaginationItem>
					) : (
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={handleFetchPreviousPage}
							/>
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationLink href="#">{page + 1}</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationNext
							style={{
								pointerEvents: nextCursor ? "auto" : "none",
							}}
							href="#"
							onClick={handleFetchNextPage}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default GlobalPagination;
