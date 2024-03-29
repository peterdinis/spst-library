'use client';

import React, { FC, useState } from 'react';
import Header from '../shared/Header';
import { Input } from '~/components/ui/input';
import { Ghost, Loader2 } from 'lucide-react';
import { api } from '~/trpc/react';
import GlobalCard from '../shared/GlobalCard';
import GlobalPagination from '../shared/GlobalPagination';

const AllBooksWrapper: FC = () => {
    const { data, isLoading, isError } = api.book.fetchBooks.useQuery();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);

    const limit = 2 as const;

    const {
        data: paginatedData,
        fetchNextPage,
        isFetchingNextPage,
        isLoading: paginatedLoading,
        isError: paginatedError,
    } = api.book.paginatedBooks.useInfiniteQuery(
        {
            limit,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    );

    if (isLoading) {
        return <Loader2 className='h-8 w-8 animate-spin' />;
    }

    if (isError) {
        return (
            <>
                <Ghost className='h-8 w-8 animate-bounce' />{' '}
                <span className='font-bold'>Knihy neboli nájdené</span>
            </>
        );
    }

    const filteredData =
        data &&
        data.filter((item: any) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

    const handleFetchNextPage = async () => {
        await fetchNextPage();
        setPage((prev) => prev + 1);
    };

    const handleFetchPreviousPage = () => {
        setPage((prev) => prev - 1);
    };

    const toShow = paginatedData?.pages[page]?.items;
    // figure out last page
    const nextCursor = paginatedData?.pages[page]?.nextCursor;

    // don't show empty categories
    if (toShow?.length === 0) return null;

    return (
        <>
            <Header text='Všetky knihy' />
            <div className='mt-5'>
                <form>
                    <Input
                        placeholder='Hľadaj knihu...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
            </div>

            {filteredData && filteredData.length === 0 && (
                <div className='mt-5 flex justify-center align-top'>
                    <span className='text-center font-bold text-gray-500'>
                        <Ghost className='h-8 w-8 animate-bounce' />
                        Žiadne knihy neboli nájdené.
                    </span>
                </div>
            )}

            <div className='mx-auto mt-5 grid gap-8 overflow-x-auto pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredData &&
                    isFetchingNextPage &&
                    toShow &&
                    filteredData.map((filteredItem: any) => (
                        <GlobalCard
                            key={filteredItem.id}
                            image={filteredItem.image}
                            linkName='books'
                            name={filteredItem.name}
                            description={filteredItem.description}
                            id={filteredItem.id}
                        />
                    ))}
            </div>

            <GlobalPagination
                handleFetchNextPage={handleFetchNextPage}
                nextCursor={nextCursor}
                page={page}
                handleFetchPreviousPage={handleFetchPreviousPage}
            />
        </>
    );
};

export default AllBooksWrapper;
