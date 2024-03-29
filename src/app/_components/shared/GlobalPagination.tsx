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
    nextCursor: any;
    handleFetchPreviousPage: (...args: unknown[]) => void;
    handleFetchNextPage: (...args: unknown[]) => void;
}

const GlobalPagination: FC<IGlobalPaginationProps> = ({
    page,
    nextCursor,
    handleFetchNextPage,
    handleFetchPreviousPage,
}: IGlobalPaginationProps) => {
    return (
        <div className='mt-5'>
            <Pagination className='mt-5'>
                <PaginationContent className='flex flex-wrap'>
                    {nextCursor && (
                        <PaginationItem>
                            <PaginationPrevious
                                href='#'
                                onClick={handleFetchPreviousPage}
                            />
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationLink href='#'>{page}</PaginationLink>
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
