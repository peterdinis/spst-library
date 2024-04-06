"use client";

import { useMemo, useState } from "react";
import QuillEditor from "react-quill";

import "react-quill/dist/quill.snow.css";

const Editor = () => {
	const [value, setValue] = useState("");

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

			history: {
				delay: 2000,
				maxStack: 500,
				userOnly: true
			  },
		}),
		[],
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
		</div>
	);
};

export default Editor;
