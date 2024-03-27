import { FC } from 'react';

interface IHeaderProps {
    text: string;
}

const Header: FC<IHeaderProps> = ({ text }: IHeaderProps) => {
    return (
        <h2 className='mt-5 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
            {text}
        </h2>
    );
};

export default Header;
