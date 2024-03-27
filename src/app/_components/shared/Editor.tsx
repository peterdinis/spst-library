'use client';

import { FC, useState, useRef, useCallback, useMemo } from 'react';
import QuillEditor from 'react-quill';

const Editor: FC = () => {
    const [value, setValue] = useState<string>('Popis pre knihu');
    const quill = useRef<any | null>(null);

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files![0] as any;
            const reader = new FileReader();

            reader.onload = () => {
                const imageUrl = reader.result;
                const quillEditor = quill.current?.getEditor();

                if (quillEditor) {
                    const range = quillEditor.getSelection(true);
                    quillEditor.insertEmbed(
                        range?.index || 0,
                        'image',
                        imageUrl,
                        'user',
                    );
                }
            };

            reader.readAsDataURL(file);
        };
    }, [quill]);

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [2, 3, 4, false] }],
                    ['bold', 'italic', 'underline', 'blockquote'],
                    [{ color: [] }],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                    ],
                    ['link', 'image'],
                    ['clean'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
            clipboard: {
                matchVisual: true,
            },
        }),
        [imageHandler],
    );

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
        'clean',
    ];

    return (
        <div className='mt-4'>
            <QuillEditor
                // className='peer mt-4 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600'
                ref={(el: any) => (quill.current = el)}
                theme='snow'
                value={value}
                formats={formats}
                modules={modules}
                onChange={(value) => setValue(value)}
            />
        </div>
    );
};

export default Editor;
