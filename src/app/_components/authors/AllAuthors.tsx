"use client";

import { FC, useState, ChangeEvent, useMemo } from "react";
import Header from "../shared/Header";
import { api } from "~/trpc/react";
import { Loader2, Ghost } from "lucide-react";
import { Input } from "~/components/ui/input";
import GlobalPagination from "../shared/GlobalPagination";
import GlobalCard from "../shared/GlobalCard";
import { useDebounce } from "~/hooks/useDebounce";

const AllAuthors: FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(0);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const limit = 50 as const;

	const {
		data: paginatedData,
		fetchNextPage,
		isFetchingNextPage,
		isLoading: paginatedLoading,
		isError: paginatedError,
	} = api.author.paginatedAuthors.useInfiniteQuery(
		{
			limit,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		},
	);

	const toShow = paginatedData?.pages[page]?.items;
	const nextCursor = paginatedData?.pages[page]?.nextCursor;

	const filteredData = useMemo(() => {
		return (
		  toShow &&
		  toShow.filter((item) =>
			item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
		  )
		);
	  }, [toShow, debouncedSearchTerm]);

	if (isFetchingNextPage || paginatedLoading) {
		return <Loader2 className="h-8 w-8 animate-spin" />;
	}

	if (paginatedError) {
		return (
			<div className="mt-6 flex justify-center align-top">
				<Ghost className="h-8 w-8 animate-bounce" />{" "}
				<span className="font-bold">Spisovatelia neboli nájdení</span>
			</div>
		);
	}
	const handleFetchNextPage = async () => {
		await fetchNextPage();
		setPage((prev) => prev + 1);
	};

	const handleFetchPreviousPage = () => {
		setPage((prev) => prev - 1);
	};

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<>
			<Header text="Všetci spisovatelia" />
			<div className="mt-5">
				<form>
					<Input
						placeholder="Hľadaj spisovateľa/ku..."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
				</form>
			</div>

			{filteredData && filteredData.length === 0 && (
				<div className="mt-5 flex justify-center align-top">
					<span className="text-center font-bold text-gray-500">
						<Ghost className="h-8 w-8 animate-bounce" />
						Žiadny spisovatelia neboli nájdení.
					</span>
				</div>
			)}

			<div className="mx-auto mt-5 grid gap-8 overflow-x-auto pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{!paginatedLoading &&
					filteredData &&
					filteredData.map((filteredItem) => (
						<GlobalCard
							description={filteredItem.description}
							key={filteredItem.id}
							image={filteredItem.authorImage}
							linkName="authors"
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

export default AllAuthors;
