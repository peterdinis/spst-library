'use client';

import { FC } from 'react';
import Header from '../shared/Header';
import { useParams } from 'next/navigation';
import { api } from '~/trpc/react';
import { Loader2 } from 'lucide-react';
import GlobalErrorComponent from '../shared/GlobalErrorComponent';
import { format } from 'date-fns';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

const BookDetail: FC = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = api.book.fetchBookById.useQuery({
        id: Number(id),
    });

    if (isLoading) {
        return <Loader2 className='animate-spin' />;
    }

    if (isError) {
        return (
            <GlobalErrorComponent
                statusCode='404'
                message='Kniha pod týmto id neexistuje'
            />
        );
    }

    console.log('D', data);
    return (
        <>
            <Header text='Detail knihy' />
            {!isLoading ? (
                <>
                    <section className='body-font mt-2 overflow-hidden bg-white text-gray-700'>
                        <div className='container mx-auto px-5 py-12'>
                            <div className='mx-auto flex flex-wrap lg:w-4/5'>
                                <img
                                    alt={data && data.name}
                                    className='w-full rounded-lg border object-cover object-center drop-shadow-md lg:w-1/2'
                                    src={data && data.image}
                                />
                                <div className='mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10'>
                                    <div>
                                        <h1 className='title-font mb-1 text-4xl font-medium text-gray-900'>
                                            <span className='font-bold'>
                                                Názov
                                            </span>
                                            : {data && data.name}{' '}
                                        </h1>
                                    </div>
                                    <p className='mb-4 mt-3 text-2xl font-light  leading-relaxed text-gray-800'>
                                        <span className='font-bold'>
                                            Krátky popis:{' '}
                                            {data && data.description}
                                        </span>
                                    </p>
                                    <p className='mb-4 mt-3 text-2xl font-light  leading-relaxed text-gray-800'>
                                        <span className='font-bold'>
                                            Autor / ka
                                        </span>
                                        : {data && data?.authorName}
                                    </p>
                                    <p className='mb-4 mt-3 text-2xl font-light  leading-relaxed text-gray-800'>
                                        <span className='font-bold'> Rok</span>:
                                        {data &&
                                            format(data.year, 'dd-MM-yyyy')}
                                    </p>
                                    <p className='mb-4 mt-3 text-2xl font-light  leading-relaxed text-gray-800'>
                                        <span className='font-bold'>
                                            {' '}
                                            Počet Strán
                                        </span>
                                        : {data && data.pages}
                                    </p>
                                    <p className='mb-4 mt-3 text-2xl font-light  leading-relaxed text-gray-800'>
                                        <span className='font-bold'>
                                            Počet Kusov
                                        </span>
                                        : {data && data.itemsInStock}
                                    </p>

                                    <hr className='mt-6' />
                                    <div className='flex'>
                                        <Button
                                            variant={'default'}
                                            size={'lg'}
                                            className='mt-5'
                                        >
                                            <Link href='/books'>
                                                Návrat na knihy
                                            </Link>
                                        </Button>
                                        <Button
                                            variant={'secondary'}
                                            size={'lg'}
                                            className='ml-4 mt-5'
                                        >
                                            Požičať knihu TODO
                                        </Button>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : null}
        </>
    );
};

export default BookDetail;
