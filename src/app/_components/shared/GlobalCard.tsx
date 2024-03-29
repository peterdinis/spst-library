import { FC } from 'react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { IGlobalCardType } from '~/app/types/sharedTypes';

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
                <span className='mr-3 text-lg uppercase text-gray-400'>
                    {name}
                </span>
                {!description ? (
                    <></>
                ) : (
                    <p className='block truncate text-sm font-bold capitalize text-black'>
                        {description}
                    </p>
                )}
                <div className='flex items-center p-4'>
                    <Button variant={'default'} size={'lg'}>
                        <Link href={`/${linkName}/${id}`}>Detail</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default GlobalCard;
