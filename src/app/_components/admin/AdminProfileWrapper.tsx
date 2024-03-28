import { FC } from 'react';
import Header from '../shared/Header';
import { DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';

const AdminProfileWrapper: FC = () => {
    return (
        <>
            <Header text='Admin nástenka' />
            <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
                <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Revenue
                            </CardTitle>
                            <DollarSign className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>$45,231.89</div>
                            <p className='text-xs text-muted-foreground'>
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Revenue
                            </CardTitle>
                            <DollarSign className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>$45,231.89</div>
                            <p className='text-xs text-muted-foreground'>
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Revenue
                            </CardTitle>
                            <DollarSign className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>$45,231.89</div>
                            <p className='text-xs text-muted-foreground'>
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>
                                Total Revenue
                            </CardTitle>
                            <DollarSign className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>$45,231.89</div>
                            <p className='text-xs text-muted-foreground'>
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
};

export default AdminProfileWrapper;
