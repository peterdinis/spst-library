"use client"

import { FC, useState } from 'react';
import Header from '../shared/Header';
import ReactQuill from "react-quill"

const CreateBookForm: FC = () => {
    const [convertedText, setConvertedText] = useState("Some default content");

    return (
        <>
          <Header text='Tvorba novej knihy' />
          <ReactQuill
            theme='snow'
            value={convertedText}
            onChange={setConvertedText}
            style={{minHeight: '300px'}}
            />
        </>
    )
};

export default CreateBookForm;
