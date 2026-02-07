import AdminSelector from "@/components/AdminSelector";
import ImageUploader from "@/components/ImageUploader";
import TextEditor from "@/components/TextEditor";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const TYPE = ["performance", "release", "collaboration", "others"];

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

export default function FormNews() {
  const [date, setDate] = useState(formatDate(new Date()));
  const [type, setType] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [titleKr, setTitleKr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [contentKr, setContentKr] = useState("");
  const [contentEn, setContentEn] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const validate = () => {
    if (!type) return "타입 필드 없음.";
    if (!coverImage) return "대표이미지 필드 없음.";
    if (!titleKr.trim()) return "한글 제목 필드 없음.";
    if (!titleEn.trim()) return "영문 제목 필드 없음.";
    if (!stripHtml(contentKr)) return "한글 내용 필드 없음.";
    if (!stripHtml(contentEn)) return "영문 내용 필드 없음.";
    return null;
  };

  const reset = () => {
    setDate(formatDate(new Date()));
    setType(null);
    setCoverImage(null);
    setTitleKr("");
    setTitleEn("");
    setContentKr("");
    setContentEn("");
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
        type,
        image: coverImage,
        titleKr,
        titleEn,
        contentKr,
        contentEn,
      };

      const { error } = await supabase.from("news").insert(payload);

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
        navigate("/news");
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
        <h3>타입</h3>
        <AdminSelector items={TYPE} onChange={setType} />
      </div>

      <div className="fle flex-col items-start gap-4 !space-y-4">
        <h3>대표이미지</h3>
        <ImageUploader onChange={setCoverImage} folder="news" />
      </div>

      <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
        <h3>한글 제목</h3>
        <input
          type="text"
          className="border grow !px-4 !py-1 !bg-white rounded-md max-sm:w-full"
          value={titleKr}
          onChange={(e) => setTitleKr(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
        <h3>영문 제목</h3>
        <input
          type="text"
          className="border grow !px-4 !py-1 !bg-white rounded-md max-sm:w-full"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-start w-full !space-y-4">
        <h3>한글 내용</h3>
        <TextEditor
          value={contentKr}
          onChange={setContentKr}
          placeholder="한글 내용을 입력."
          folder="news"
        />
      </div>

      <div className="flex flex-col items-start w-full !space-y-4">
        <h3>영문 내용</h3>
        <TextEditor
          value={contentEn}
          onChange={setContentEn}
          placeholder="영문 내용을 입력."
          folder="news"
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
