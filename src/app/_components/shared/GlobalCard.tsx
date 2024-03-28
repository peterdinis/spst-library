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
        <div className='z-50 w-72 rounded-xl bg-white shadow-md duration-500'>
            <div>
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
                    <span className='mr-3 text-xs uppercase text-gray-400'>
                        {name}
                    </span>
                    <p className='block truncate text-lg font-bold capitalize text-black'>
                        {description}
                    </p>
                    <div className='flex items-center p-4'>
                        <Button variant={'default'} size={'lg'}>
                            <Link href={`/${linkName}/${id}`}>Detail</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalCard;
