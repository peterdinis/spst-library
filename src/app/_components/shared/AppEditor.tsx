import { EditorContent, EditorProvider, useEditor } from '@tiptap/react'
import React from 'react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Strike from '@tiptap/extension-strike'

const AppEditor= () => {

  const extensions = [
    Document,
    Paragraph,
    Heading.configure({
        levels: [1, 2, 3],
    }),
    Strike,
    Text
  ]

  const content = '<p>Krátky popis</p>'

  const editor = useEditor({
    extensions,
    content,
  })

  return (
    <EditorProvider  extensions={extensions}>
        <EditorContent editor={editor} />
    </EditorProvider>
  )
}

export default AppEditor