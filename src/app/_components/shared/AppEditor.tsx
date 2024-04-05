"use client"

import { useMemo, useRef, useState } from "react";
import QuillEditor from "react-quill";

import "react-quill/dist/quill.snow.css";
import { Button } from "~/components/ui/button";

const Editor = () => {
  const [value, setValue] = useState("");

  const quill = useRef<any>();
  function handler() {
    console.log(value);
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
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
      clipboard: {
        matchVisual: true,
      },
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
    <div>
      <QuillEditor
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => setValue(value)}
      />
      <Button variant={"ghost"} size={"lg"} onClick={handler}>Submit</Button>
    </div>
  );
};

export default Editor;