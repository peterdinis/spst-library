'use client';

import { FC } from 'react';
import Header from '../shared/Header';
import Editor from '../shared/Editor';

const CreateBookForm: FC = () => {
    return (
        <>
            <Header text='Tvorba novej knihy' />
            <Editor />
        </>
    );
};

export default CreateBookForm;
