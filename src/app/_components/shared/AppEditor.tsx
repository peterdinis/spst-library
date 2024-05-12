"use client";

import { useMemo } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

interface AppEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const AppEditor = ({ value, onChange }: AppEditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      },
      clipboard: { matchVisual: true },
      history: { delay: 2000, maxStack: 500, userOnly: true },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <QuillEditor
      theme="snow"
      value={value}
      formats={formats}
      modules={modules}
      onChange={(content, delta, source, editor) => onChange(editor.getText())}
    />
  );
};

export default AppEditor;
