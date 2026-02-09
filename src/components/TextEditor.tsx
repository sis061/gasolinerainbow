import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { supabase } from "@/lib/supabase";
import { toWebp } from "@/utils/convertImage";
import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  folder?: "news" | "notes";
};

const BUCKET = "media";

export default function TextEditor({
  value,
  onChange,
  placeholder = "내용을 입력하세요…",
  folder = "notes",
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder }), Image],
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

  // value → editor 동기화
  const lastHtmlRef = useRef<string>("");

  useEffect(() => {
    if (!editor) return;
    if (!value) return;

    // 무한루프 방지: 에디터가 이미 같은 내용을 갖고 있으면 스킵
    const current = editor.getHTML();
    if (current === value) return;

    // 더 강하게 막고 싶으면 ref도 같이 사용
    if (lastHtmlRef.current === value) return;

    editor.commands.setContent(value); // false: history에 안 쌓음
    lastHtmlRef.current = value;
  }, [editor, value]);

  const uploadToSupabase = async (file: File) => {
    const ext = "webp";
    const name = `${crypto.randomUUID()}.${ext}`;
    const path = `${folder}/${name}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: "image/webp",
      upsert: false,
    });

    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleInsertImage = async (file: File) => {
    const webp = await toWebp(file);
    const url = await uploadToSupabase(webp);

    // 현재 커서 위치에 삽입
    editor.chain().focus().setImage({ src: url }).run();
  };

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
        {/* <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • A
        </button> */}
        {/* <button
          type="button"
          className="rounded !px-2 !py-1"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. A
        </button> */}
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
        {folder === "notes" && (
          <>
            <button
              type="button"
              className="rounded !px-2 !py-1"
              onClick={() => fileRef.current?.click()}
            >
              Image
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="image/*,.heic,.heif"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                await handleInsertImage(f);
                e.target.value = ""; // 같은 파일 재선택 가능
              }}
            />
          </>
        )}
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
