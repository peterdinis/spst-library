import {
	useEditor,
	EditorContent,
	FloatingMenu,
	BubbleMenu,
	EditorProvider,
	Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC } from "react";


const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

const AppEditor: FC = () => {
	const editor = useEditor({
		extensions,
		content,
	});

	return (
		<EditorProvider extensions={extensions} content={content}>
			<EditorContent editor={editor} />
			<FloatingMenu editor={editor as unknown as Editor}>
				This is the floating menu
			</FloatingMenu>
			<BubbleMenu editor={editor as unknown as Editor}>
				This is the bubble menu
			</BubbleMenu>
		</EditorProvider>
	);
};

export default AppEditor;
