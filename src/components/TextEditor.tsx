import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function TextEditor({
  value,
  onChange,
  placeholder = "내용을 입력하세요…",
}: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder })],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-40 w-full rounded-md border bg-white p-3 outline-none prose max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full flex flex-col gap-2 border rounded-lg">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <i>i</i>
        </button>
        <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <s>A</s>
        </button>
        <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • A
        </button>
        <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. A
        </button>
        {/* <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </button> */}
        <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          밑줄
        </button>
        <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
