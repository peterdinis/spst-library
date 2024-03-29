"use client"

import { FC, useState } from 'react';
import Header from '../shared/Header';
import { api } from '~/trpc/react';
import { Loader2, Ghost } from 'lucide-react';

const AllPublishers: FC = () => {
    const {data, isLoading, isError} = api.publisher.fetchPublishers.useQuery();
    const [searchTerm, setSearchTerm] = useState('');
    
    if (isLoading) {
        return <Loader2 className='h-8 w-8 animate-spin' />;
    }

    if (isError) {
        return (
            <>
                <Ghost className='h-8 w-8 animate-bounce' />{' '}
                <span className='font-bold'>Vydavateľstvá neboli nájdené</span>
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
            <Header text='Všetky vydavateľstvá' />
        </>
    );
};

export default AllPublishers;
