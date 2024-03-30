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
import LongText from '../shared/LongText';

const PublisherInfo: FC = () => {
    const {id} = useParams();
    const { data, isLoading, isError } = api.publisher.fetchPublisherById.useQuery({
        id: Number(id),
    });

    if (isLoading) {
        return <Loader2 className='animate-spin' />;
    }

    if (isError) {
        return (
            <GlobalErrorComponent
                statusCode='404'
                message='Vydavateľstvo pod týmto id neexistuje'
            />
        );
    }

    return (
        <>
            <Header text='Detail o vydavateľstve' />
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
                                    <div>
                                        <h1 className='title-font mb-1 mt-5 text-4xl font-medium text-gray-900'>
                                            <span className='font-bold'>
                                                Knihy
                                            </span>
                                            : {data && data.books.map((item) => {
                                                return (
                                                    <>
                                                        {item.name}
                                                    </>
                                                )
                                            })}
                                        </h1>
                                    </div>
                                    <hr className='mt-6' />
                                    <div className='flex'>
                                        <Button
                                            variant={'default'}
                                            size={'lg'}
                                            className='mt-5'
                                        >
                                            <Link href='/publishers'>
                                                Návrat na zoznam vydavateľstiev
                                            </Link>
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
    )
};

export default PublisherInfo;
