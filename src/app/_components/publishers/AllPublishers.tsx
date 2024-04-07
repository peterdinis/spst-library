"use client";

import { FC, useState } from "react";
import Header from "../shared/Header";
import { api } from "~/trpc/react";
import { Loader2, Ghost } from "lucide-react";
import { Input } from "~/components/ui/input";
import GlobalPagination from "../shared/GlobalPagination";
import GlobalCard from "../shared/GlobalCard";

const AllPublishers: FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(0);

	const limit = 10 as const;

	const {
		data: paginatedData,
		fetchNextPage,
		isFetchingNextPage,
		isLoading: paginatedLoading,
		isError: paginatedError,
	} = api.publisher.paginatedPublishers.useInfiniteQuery(
		{
			limit,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);

	if (isFetchingNextPage || paginatedLoading) {
		return <Loader2 className="h-8 w-8 animate-spin" />;
	}

	if (paginatedError) {
		return (
			<div className="mt-6 flex justify-center align-top">
				<Ghost className="h-8 w-8 animate-bounce" />{" "}
				<span className="font-bold">Vydavateľstvá neboli nájdení</span>
			</div>
		);
	}

	const toShow = paginatedData?.pages[page]?.items;
	const nextCursor = paginatedData?.pages[page]?.nextCursor;

	const handleFetchNextPage = async () => {
		await fetchNextPage();
		setPage((prev) => prev + 1);
	};

	const handleFetchPreviousPage = () => {
		setPage((prev) => prev - 1);
	};

	return (
		<>
			<Header text="Všetky vydavateľstvá" />
			<div className="mt-5">
				<form>
					<Input
						placeholder="Hľadaj vydavateľstvo..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</form>
			</div>

			{toShow && toShow.length === 0 && (
				<div className="mt-5 flex justify-center align-top">
					<span className="text-center font-bold text-gray-500">
						<Ghost className="h-8 w-8 animate-bounce" />
						Žiadne Vydavateľstvá neboli nájdené.
					</span>
				</div>
			)}

			<div className="mx-auto mt-5 grid gap-8 overflow-x-auto pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{!paginatedLoading &&
					toShow &&
					toShow.map((filteredItem) => (
						<GlobalCard
							key={filteredItem.id}
							description={filteredItem.description}
							image={filteredItem.image}
							linkName="publishers"
							name={filteredItem.name}
							id={filteredItem.id}
						/>
					))}
			</div>

			<GlobalPagination
				handleFetchNextPage={handleFetchNextPage}
				page={page}
				nextCursor={nextCursor as unknown as number}
				handleFetchPreviousPage={handleFetchPreviousPage}
			/>
		</>
	);
};

export default AllPublishers;
