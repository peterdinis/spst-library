"use client";

import { FC } from "react";
import { IGlobalPaginationProps } from "~/app/types/sharedTypes";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationNext,
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
