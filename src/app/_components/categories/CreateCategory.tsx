'use client';

import { FC } from 'react';
import Header from '../shared/Header';
import { Button } from '~/components/ui/button';
import { addCategorySchema } from '~/schemas/categorySchemas';
import * as z from 'zod';
import { api } from '~/trpc/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '~/components/ui/use-toast';
import AuthorSelect from '../authors/AuthorSelect';

type CreateCategorySchema = z.infer<typeof addCategorySchema>;

const CreateCategory: FC = () => {
    const { toast } = useToast();

    const form = useForm<CreateCategorySchema>({
        resolver: zodResolver(addCategorySchema),
        mode: 'onChange',
    });

    const addCategoryMut = api.category.createCategory.useMutation({
        onSuccess: () => {
            toast({
                title: 'Nová kategória bola vytvorená',
                duration: 2000,
                className: 'bg-green-500 text-white',
            });
        },

        onError: () => {
            toast({
                title: 'Nová kategória nebola vytvorená',
                duration: 2000,
                className: 'bg-red-500 text-white',
            });
        },
    });

    const onSubmit: SubmitHandler<CreateCategorySchema> = async (
        data: CreateCategorySchema,
    ) => {
        await addCategoryMut.mutateAsync({
            name: data.name,
            description: data.description,
        });
        form.reset();
    };

    return (
        <>
            <Header text='Tvorba novej kategórie' />
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='mx-auto mt-10 max-w-2xl'
            >
                <div className='group relative z-0 mb-6'>
                    <input
                        type='text'
                        className='peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600'
                        placeholder='Meno kategórie'
                        {...form.register('name', { required: true })}
                    />
                </div>
                <div className='group relative z-0 mb-6'>
                    <input
                        type='text'
                        className='peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600'
                        placeholder='Popis kategórie'
                        {...form.register('description', { required: true })}
                    />
                </div>
                <div className='group relative z-0 mb-6'>
                    {/* <input
                        type='text'
                        className='peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600'
                        placeholder='Popis kategórie'
                        {...form.register('description', { required: true })}
                    /> */}
                    <AuthorSelect />
                </div>
                <div className='flex justify-center align-top'>
                    <Button variant={'default'} size={'lg'}>
                        Pridaj novú kategóiu
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreateCategory;
