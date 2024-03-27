import { FC } from 'react';
import Header from '../shared/Header';
import { Input } from '~/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Button } from '~/components/ui/button';

const CreateCategory: FC = () => {
    return (
        <>
            <Header text='Tvorba novej kategórie' />
            <form className='mx-auto mt-10 max-w-2xl'>
                <div className='group relative z-0 mb-6'>
                    <Input
                        type='text'
                        className='peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600'
                        placeholder='Meno kategórie'
                    />
                </div>
                <div className='group relative z-0 mb-6'>
                    <Input
                        type='text'
                        className='peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600'
                        placeholder='Popis kategórie'
                    />
                </div>
                <div className="flex justify-center align-top">
                    <Button variant={"default"} size={"lg"}>Pridaj novú kategóiu</Button>
                </div>
            </form>
        </>
    );
};

export default CreateCategory;
