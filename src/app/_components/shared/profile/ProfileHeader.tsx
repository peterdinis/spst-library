import { FC } from 'react';

interface IProfileHeaderProps {
    email: string;
}

const ProfileHeader: FC<IProfileHeaderProps> = ({
    email,
}: IProfileHeaderProps) => {
    return (
        <div className='mt-20 w-full md:mx-2 md:w-3/12'>
            <div className='bg-white p-2'>
                <h1 className='my-6 break-words text-xl font-bold leading-8 text-gray-900'>
                    {email}
                </h1>
            </div>
        </div>
    );
};

export default ProfileHeader;
