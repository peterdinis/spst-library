import { FC } from 'react';
import Header from '../shared/Header';
import DashboardCards from './dashboard/DashboardCards';
import BookingsTable from './dashboard/BookingsTable';

/* TODO: Neskôr dokončiť */

const AdminProfileWrapper: FC = () => {
    return (
        <>
            <Header text='Admin nástenka' />
            <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
                <DashboardCards />
                <BookingsTable />
            </main>
        </>
    );
};

export default AdminProfileWrapper;
