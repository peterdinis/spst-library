import { FC } from 'react';
import ProfileHeader from '../shared/profile/ProfileHeader';
import ProfileBody from '../shared/profile/ProfileBody';

const ProfileWrapper: FC = () => {
    return (
        <>
            <ProfileHeader email={'random@gmail.com'} />
            <ProfileBody name='Random' lastName='MR' />
        </>
    );
};

export default ProfileWrapper;
