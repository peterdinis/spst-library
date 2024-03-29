'use client';

import { FC, useState } from 'react';
import Header from '../shared/Header';
import { api } from '~/trpc/react';
import { Loader2, Ghost } from 'lucide-react';
import { Input } from '~/components/ui/input';
import GlobalPagination from '../shared/GlobalPagination';
import GlobalCard from '../shared/GlobalCard';

const AllAuthors: FC = () => {
    const { data, isLoading, isError } = api.author.fetchAuthors.useQuery();
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) {
        return <Loader2 className='h-8 w-8 animate-spin' />;
    }

    if (isError) {
        return (
            <>
                <Ghost className='h-8 w-8 animate-bounce' />{' '}
                <span className='font-bold'>Spisovatelia neboli nájdení</span>
            </>
        );
    }

    const filteredData =
        data &&
        data.filter((item: any) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

    return (
        <>
            <Header text='Všetci spisovatelia' />
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
                        Žiadny spisovatelia neboli nájdení.
                    </span>
                </div>
            )}

            <div className='mx-auto mt-5 grid gap-8 overflow-x-auto pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredData &&
                    filteredData.map((filteredItem: any) => (
                        <GlobalCard
                            key={filteredItem.id}
                            image={filteredItem.authorImage}
                            linkName='authors'
                            name={filteredItem.name}
                            id={filteredItem.id}
                        />
                    ))}
            </div>

            <GlobalPagination />
        </>
    );
};

export default AllAuthors;
