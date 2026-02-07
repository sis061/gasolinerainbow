import AdminSelector from "@/components/AdminSelector";
import ImageUploader from "@/components/ImageUploader";
import TextEditor from "@/components/TextEditor";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const TYPE = [
  "모디파이는 질병입니다.",
  "커피하우스 토크",
  "프롤로그",
  "에필로그",
  "직접입력",
];

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

export default function FormNotes() {
  const [date, setDate] = useState(formatDate(new Date()));
  const [category, setCategory] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const validate = () => {
    if (!category) return "타입 필드 없음.";
    if (!title.trim()) return "제목 필드 없음.";
    if (!stripHtml(content)) return "내용 필드 없음.";
    return null;
  };

  const reset = () => {
    setDate(formatDate(new Date()));
    setCategory(null);
    setCoverImage(null);
    setTitle("");
    setContent("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setErrorMsg(null);

    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        date,
        category,
        image: coverImage,
        title,
        content,
      };

      const { error } = await supabase.from("notes").insert(payload);

      if (error) {
        const msg =
          error.message?.toLowerCase().includes("row level security") ||
          error.code === "42501"
            ? "권한이 없습니다."
            : `업로드 실패: ${error.message}`;
        setErrorMsg(msg);
        return;
      }

      reset();
      setTimeout(() => {
        navigate("/authornote");
      }, 500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-8 [&_h3]:font-extrabold"
    >
      {errorMsg ? (
        <div className="text-red-500 font-extrabold !p-3 !text-sm">
          {errorMsg}
        </div>
      ) : null}

      <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
        <h3>날짜</h3>
        <input
          type="date"
          className="border !px-4 !py-1 !bg-white rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
        <h3>카테고리</h3>
        <AdminSelector items={TYPE} onChange={setCategory} isInputAvaliable />
      </div>

      <div className="fle flex-col items-start gap-4 !space-y-4">
        <h3>대표이미지</h3>
        <ImageUploader onChange={setCoverImage} folder="notes" />
      </div>

      <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
        <h3>제목</h3>
        <input
          type="text"
          className="border grow !px-4 !py-1 !bg-white rounded-md max-sm:w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-start w-full !space-y-4">
        <h3>내용</h3>
        <TextEditor
          value={content}
          onChange={setContent}
          placeholder="한글 내용을 입력."
          folder="notes"
        />
      </div>

      <button
        type="submit"
        className="border !p-2 bg-black !text-white disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? "업로드 중..." : "업로드"}
      </button>
    </form>
  );
}
