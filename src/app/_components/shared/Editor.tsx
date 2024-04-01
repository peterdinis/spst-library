"use client";

import { FC, useState, useMemo } from "react";
import QuillEditor from "react-quill";

const Editor: FC = () => {
	const [value, setValue] = useState<string>("Popis pre knihu");

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
		<div className="mt-4">
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
