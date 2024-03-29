import { FC } from 'react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { IGlobalCardType } from '~/app/types/sharedTypes';
import { CardDescription, CardFooter, CardHeader } from '~/components/ui/card';

const GlobalCard: FC<IGlobalCardType> = ({
    name,
    description,
    id,
    linkName,
    image,
}) => {
    return (
        <div className='ml-4'>
            {image ? (
                <>
                    <img
                        src={image}
                        alt={name}
                        className='h-80 w-72 rounded-t-xl object-cover'
                    />
                </>
            ) : (
                <></>
            )}
            <div className='z-50 w-72 px-4 py-3'>
                <CardHeader className='mr-3 text-lg uppercase text-gray-400 font-bold'>
                    {name}
                </CardHeader>
                {!description ? (
                    <></>
                ) : (
                    <CardDescription className='block truncate text-sm font-bold capitalize text-black'>
                        {description}
                    </CardDescription>
                )}
                <CardFooter>
                <div className='flex items-center p-4'>
                    <Button variant={'default'} size={'lg'}>
                        <Link href={`/${linkName}/${id}`}>Detail</Link>
                    </Button>
                </div>
                </CardFooter>
            </div>
        </div>
    );
};

export default GlobalCard;
