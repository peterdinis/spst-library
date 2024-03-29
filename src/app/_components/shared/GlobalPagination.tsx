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
                        {page <= 0 ? (
                            <PaginationItem>
                                <PaginationPrevious
                                    style={{
                                        pointerEvents: 'none',
                                    }}
                                    href='#'
                                    onClick={handleFetchPreviousPage}
                                />
                            </PaginationItem>
                        ) : (
                            <PaginationItem>
                                <PaginationPrevious
                                    href='#'
                                    onClick={handleFetchPreviousPage}
                                />
                            </PaginationItem>
                        )}
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
