import { FC } from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '~/components/ui/card';
import { IGlobalCardType } from '~/app/types/sharedTypes';

const GlobalCard: FC<IGlobalCardType> = ({
    name,
    description,
    id,
    linkName,
    image,
}) => {
    return (
        <Card>
            {!image ? (
                <></>
            ) : (
                <LazyLoadImage
                    className='h-auto max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30'
                    src={image as unknown as string}
                    alt={name as unknown as string}
                />
            )}
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Button variant={'default'} size='lg'>
                <Link href={`/${linkName}/${id}`}>Detail</Link>
            </Button>
        </Card>
    );
};

export default GlobalCard;
