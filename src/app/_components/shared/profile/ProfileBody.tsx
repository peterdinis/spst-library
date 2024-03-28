import { User2 } from 'lucide-react';
import { FC } from 'react';

interface IProfileBodyProps {
    name: string;
    lastName: string;
}

const ProfileBody: FC<IProfileBodyProps> = ({ name, lastName }) => {
    return (
        <div className='h-128 mx-2 w-full md:w-9/12'>
            <div className='rounded-sm bg-white p-3 shadow-sm'>
                <div className='flex items-center space-x-2 leading-8 text-gray-900'>
                    <User2 className='h-8 w-8' />
                    <span className='tracking-wide'>Základné informácie</span>
                </div>
                <div className='text-gray-700'>
                    <div className='grid text-sm md:grid-cols-2'>
                        <div className='grid grid-cols-2'>
                            <div className='px-4 py-2'>Meno</div>
                            <div className='px-4 py-2'>{name}</div>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className='px-4 py-2'>Priezvisko</div>
                            <div className='px-4 py-2'>{lastName}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileBody;
