import AdminSelector from "@/components/AdminSelector";
import ImageUploader from "@/components/ImageUploader";
import TextEditor from "@/components/TextEditor";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const TYPE = ["performance", "release", "collaboration", "others"];

type Props = {
  mode: "create" | "edit";
  initialId?: number;
  onDone?: () => void;
  onCancel?: () => void;
};

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

export const normalizeEditorHtml = (html: string) => {
  if (!html) return "";

  return (
    html
      // 1. 완전히 비어있는 p (속성 포함) → <p><br></p>
      .replace(/<p\b[^>]*>(?:\s|&nbsp;)*<\/p>/g, "<p><br></p>")

      // 2. p 안에 공백 + <br> 여러 개 꼬인 경우 → 하나로 정리
      .replace(/<p><br\s*\/?><\/p>/g, "<p><br></p>")
  );
};

export default function FormNews({ mode, initialId, onDone, onCancel }: Props) {
  const [date, setDate] = useState(formatDate(new Date()));
  const [type, setType] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [titleKr, setTitleKr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [contentKr, setContentKr] = useState("");
  const [contentEn, setContentEn] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (mode !== "edit" || !initialId) return;

    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", initialId)
        .single();

      if (!alive) return;
      if (error || !data) return;

      setDate(data.date);
      setType(data.type);
      setCoverImage(data.image);
      setTitleKr(data.titleKr);
      setTitleEn(data.titleEn);
      setContentKr(data.contentKr);
      setContentEn(data.contentEn);
    })();

    return () => {
      alive = false;
    };
  }, [mode, initialId]);

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
        contentKr: normalizeEditorHtml(contentKr),
        contentEn: normalizeEditorHtml(contentEn),
      };

      const { error } =
        mode === "edit" && initialId
          ? await supabase.from("news").update(payload).eq("id", initialId)
          : await supabase.from("news").insert(payload);

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
      onDone?.();
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
        <AdminSelector items={TYPE} onChange={setType} defaultValue={type} />
      </div>

      <div className="fle flex-col items-start gap-4 !space-y-4">
        <h3>대표이미지</h3>
        <ImageUploader
          value={coverImage}
          onChange={setCoverImage}
          folder="news"
          onUploadingChange={setImageUploading}
        />
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
        disabled={submitting || imageUploading}
      >
        {submitting
          ? "업로드 중..."
          : imageUploading
            ? "이미지 처리 중..."
            : "업로드"}
      </button>

      {mode === "edit" && (
        <button
          className="border !p-2 bg-black !text-white disabled:opacity-50"
          disabled={submitting || imageUploading}
          onClick={onCancel}
        >
          수정 취소
        </button>
      )}
    </form>
  );
}
