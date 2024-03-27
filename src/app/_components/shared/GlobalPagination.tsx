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

const GlobalPagination: FC = () => {
    return (
        <div className='mt-5'>
            <Pagination className='mt-5'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href='#' />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href='#'>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href='#' />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default GlobalPagination;
