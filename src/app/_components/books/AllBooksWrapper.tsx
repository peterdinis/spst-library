"use client";

import { Ghost, Loader2 } from "lucide-react";
import { type ChangeEvent, type FC, useMemo, useState } from "react";
import { limit } from "~/app/_constants/app-constants";
import type { IBookCard } from "~/app/types/bookTypes";
import { Input } from "~/components/ui/input";
import { useDebounce } from "~/hooks/useDebounce";
import { api } from "~/trpc/react";
import GlobalCard from "../shared/GlobalCard";
import GlobalPagination from "../shared/GlobalPagination";
import Header from "../shared/Header";

const AllBooksWrapper: FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const {
        data: paginatedData,
        fetchNextPage,
        isFetchingNextPage,
        isLoading: paginatedLoading,
        isError: paginatedError,
    } = api.book.paginatedBooks.useInfiniteQuery(
        { limit },
        {
            getNextPageParam: (lastPage: { nextCursor: any }) => lastPage.nextCursor,
        }
    );

    const toShow = paginatedData?.pages?.[page]?.items ?? [];
    const nextCursor = paginatedData?.pages?.[page]?.nextCursor;

    const filteredData = useMemo(() => {
        return toShow.filter((item: IBookCard) =>
            item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [toShow, debouncedSearchTerm]);

    const handleFetchNextPage = async () => {
        await fetchNextPage();
        setPage((prev) => prev + 1);
    };

    const handleFetchPreviousPage = () => {
        setPage((prev) => Math.max(prev - 1, 0));
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    if (paginatedLoading || isFetchingNextPage) {
        return <Loader2 className="h-8 w-8 animate-spin" />;
    }

    if (paginatedError) {
        return (
            <div className="mt-6 flex justify-center align-top">
                <Ghost className="h-8 w-8 animate-bounce" />{" "}
                <span className="font-bold">Knihy neboli nájdené</span>
            </div>
        );
    }

    return (
        <>
            <Header text="Všetky knihy" />
            <div className="mt-5">
                <form>
                    <Input
                        placeholder="Hľadaj knihu..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </form>
            </div>

            {filteredData.length === 0 && (
                <div className="mt-5 flex justify-center align-top">
                    <span className="text-center font-bold text-gray-500">
                        <Ghost className="h-8 w-8 animate-bounce" />
                        Žiadne knihy neboli nájdené.
                    </span>
                </div>
            )}

            <div className="mx-auto mt-5 grid gap-8 overflow-x-auto pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredData.map((filteredItem: IBookCard) => (
                    <GlobalCard
                        key={filteredItem.id}
                        image={filteredItem.image}
                        linkName="books"
                        name={filteredItem.name}
                        description={filteredItem.description}
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

export default AllBooksWrapper;