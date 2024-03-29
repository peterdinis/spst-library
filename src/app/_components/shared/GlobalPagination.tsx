'use client';

import { FC } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from '~/components/ui/pagination';

interface IGlobalPaginationProps {
    page: number;
    nextCursor: number;
    handleFetchPreviousPage: (...args: unknown[]) => void;
    handleFetchNextPage: (...args: unknown[]) => void;
}

const GlobalPagination: FC<IGlobalPaginationProps> = ({
    page,
    nextCursor,
    handleFetchNextPage,
    handleFetchPreviousPage,
}: IGlobalPaginationProps) => {
    if (nextCursor)
        return (
            <div className='mt-5'>
                <Pagination className='mt-5'>
                    <PaginationContent className='flex flex-wrap'>
                        <PaginationItem>
                            {nextCursor < 0 || nextCursor === 0}

                            <PaginationPrevious
                                aria-disabled={
                                    nextCursor < 0 || nextCursor === 0
                                }
                                href='#'
                                onClick={handleFetchPreviousPage}
                                disabled={nextCursor <= 0}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#'>{page + 1}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href='#'
                                onClick={handleFetchNextPage}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        );
};

export default GlobalPagination;
