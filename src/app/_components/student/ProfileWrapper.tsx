import { FC, JSX, SVGProps } from 'react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '~/components/ui/card';
import { Avatar, AvatarImage } from '~/components/ui/avatar';
import { User } from 'lucide-react';

function RefreshCcwIcon(
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
            <path d='M3 3v5h5' />
            <path d='M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16' />
            <path d='M16 16h5v5' />
        </svg>
    );
}

const ProfileWrapper: FC = () => {
    return (
        <>
            <div className='lg:grid-cols-profile grid gap-6 lg:gap-10'>
                <div className='space-y-2'>
                    <div className='flex items-center space-x-4 lg:space-x-6'>
                        <User />
                        <div className='space-y-1'>
                            <h1 className='text-2xl font-bold'>Alice Davis</h1>
                            <dl className='grid grid-cols-2 gap-1 text-sm lg:grid-cols-3 lg:gap-2'>
                                <div>Grade</div>
                                <div className='font-medium'>7th</div>
                                <div>Books Checked Out</div>
                                <div className='font-medium'>3</div>
                            </dl>
                        </div>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <h2 className='card-title'>Books Checked Out</h2>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className='border-t border-gray-200 dark:border-gray-800'>
                            <div className='overflow-hidden border-b border-gray-200 dark:border-gray-800'>
                                <table className='min-w-full'>
                                    <thead>
                                        <tr>
                                            <th className='px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                                                Image
                                            </th>
                                            <th className='px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                                                Title
                                            </th>
                                            <th className='px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                                                Author
                                            </th>
                                            <th className='px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                                                Due Date
                                            </th>
                                            <th className='w-12' />
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200 dark:divide-gray-800'>
                                        <tr className='bg-gray-50 dark:bg-gray-900'>
                                            <td className='px-4 py-4'>
                                                <img
                                                    alt='Book cover'
                                                    className='aspect-[4/5] rounded object-cover sm:w-20'
                                                    height='110'
                                                    src='/placeholder.svg'
                                                    width='80'
                                                />
                                            </td>
                                            <td className='whitespace-nowrap px-4 py-4'>
                                                The Great Gatsby
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-400'>
                                                F. Scott Fitzgerald
                                            </td>
                                            <td className='px-4 py-4'>
                                                2024-04-30
                                            </td>
                                            <td className='px-4 py-4 text-right'>
                                                <Button
                                                    className='h-8 w-8'
                                                    size='icon'
                                                >
                                                    <RefreshCcwIcon className='h-4 w-4' />
                                                    <span className='sr-only'>
                                                        Renew
                                                    </span>
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr className='bg-gray-50 dark:bg-gray-900'>
                                            <td className='px-4 py-4'>
                                                <img
                                                    alt='Book cover'
                                                    className='aspect-[4/5] rounded object-cover sm:w-20'
                                                    height='110'
                                                    src='/placeholder.svg'
                                                    width='80'
                                                />
                                            </td>
                                            <td className='whitespace-nowrap px-4 py-4'>
                                                To Kill a Mockingbird
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-400'>
                                                Harper Lee
                                            </td>
                                            <td className='px-4 py-4'>
                                                2024-04-30
                                            </td>
                                            <td className='px-4 py-4 text-right'>
                                                <Button
                                                    className='h-8 w-8'
                                                    size='icon'
                                                >
                                                    <RefreshCcwIcon className='h-4 w-4' />
                                                    <span className='sr-only'>
                                                        Renew
                                                    </span>
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr className='bg-gray-50 dark:bg-gray-900'>
                                            <td className='px-4 py-4'>
                                                <img
                                                    alt='Book cover'
                                                    className='aspect-[4/5] rounded object-cover sm:w-20'
                                                    height='110'
                                                    src='/placeholder.svg'
                                                    width='80'
                                                />
                                            </td>
                                            <td className='whitespace-nowrap px-4 py-4'>
                                                The Catcher in the Rye
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500 dark:text-gray-400'>
                                                J.D. Salinger
                                            </td>
                                            <td className='px-4 py-4'>
                                                2024-04-30
                                            </td>
                                            <td className='px-4 py-4 text-right'>
                                                <Button
                                                    className='h-8 w-8'
                                                    size='icon'
                                                >
                                                    <RefreshCcwIcon className='h-4 w-4' />
                                                    <span className='sr-only'>
                                                        Renew
                                                    </span>
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h2 className='card-title'>Reading History</h2>
                    </CardHeader>
                    <CardContent>
                        <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                            <li>
                                <Card className='flex h-full flex-col'>
                                    <Link
                                        className='flex flex-1 flex-col justify-between'
                                        href='#'
                                    >
                                        <CardContent className='grid gap-2 p-4'>
                                            <div className='aspect-[4/5]'>
                                                <img
                                                    alt='Book cover'
                                                    className='aspect-[4/5] rounded object-cover'
                                                    height='200'
                                                    src='/placeholder.svg'
                                                    width='160'
                                                />
                                            </div>
                                            <div className='line-clamp-2 text-sm'>
                                                The Great Gatsby
                                            </div>
                                            <div className='text-xs text-gray-500 dark:text-gray-400'>
                                                F. Scott Fitzgerald
                                            </div>
                                        </CardContent>
                                    </Link>
                                    <CardFooter className='p-4'>
                                        <div className='text-xs'>
                                            <time dateTime='2023-12-17'>
                                                Dec 17, 2023
                                            </time>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </li>
                            <li>
                                <Card className='flex h-full flex-col'>
                                    <Link
                                        className='flex flex-1 flex-col justify-between'
                                        href='#'
                                    >
                                        <CardContent className='grid gap-2 p-4'>
                                            <div className='aspect-[4/5]'>
                                                <img
                                                    alt='Book cover'
                                                    className='aspect-[4/5] rounded object-cover'
                                                    height='200'
                                                    src='/placeholder.svg'
                                                    width='160'
                                                />
                                            </div>
                                            <div className='line-clamp-2 text-sm'>
                                                To Kill a Mockingbird
                                            </div>
                                            <div className='text-xs text-gray-500 dark:text-gray-400'>
                                                Harper Lee
                                            </div>
                                        </CardContent>
                                    </Link>
                                    <CardFooter className='p-4'>
                                        <div className='text-xs'>
                                            <time dateTime='2023-12-17'>
                                                Dec 17, 2023
                                            </time>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </li>
                            <li>
                                <Card className='flex h-full flex-col'>
                                    <Link
                                        className='flex flex-1 flex-col justify-between'
                                        href='#'
                                    >
                                        <CardContent className='grid gap-2 p-4'>
                                            <div className='aspect-[4/5]'>
                                                <img
                                                    alt='Book cover'
                                                    className='aspect-[4/5] rounded object-cover'
                                                    height='200'
                                                    src='/placeholder.svg'
                                                    width='160'
                                                />
                                            </div>
                                            <div className='line-clamp-2 text-sm'>
                                                The Catcher in the Rye
                                            </div>
                                            <div className='text-xs text-gray-500 dark:text-gray-400'>
                                                J.D. Salinger
                                            </div>
                                        </CardContent>
                                    </Link>
                                    <CardFooter className='p-4'>
                                        <div className='text-xs'>
                                            <time dateTime='2023-12-17'>
                                                Dec 17, 2023
                                            </time>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ProfileWrapper;
