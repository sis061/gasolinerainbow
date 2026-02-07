import { toWebp } from "@/utils/convertImage";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  onChange: (file: string | null) => void;
  folder?: "news" | "notes";
  onUploadingChange?: (uploading: boolean) => void;
};

/* -----------------------------------------------
 * 1. 모바일(ios) 대응 - heic/heif 일 경우 jpeg로 변환
 * 2. 파일 확장자 webp로 변환 및 용량 축소
 ----------------------------------------------- */

const BUCKET = "media";

const makeUUID = () => {
  // iOS 구버전 대비 fallback
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    // @ts-ignore
    return crypto.randomUUID();
  }
  // fallback: timestamp + random
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function ImageUploader({
  onChange,
  folder,
  onUploadingChange,
}: Props) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const uploadToSupabase = async (file: File) => {
    const ext = "webp";
    const name = `${makeUUID()}.${ext}`;
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
    setErr(null);
    setUploading(true);
    onUploadingChange?.(true);

    try {
      const webp = await toWebp(file);
      const url = await uploadToSupabase(webp);

      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(webp);
      });

      setCoverImage(webp);
      onChange(url);
    } catch (e: any) {
      console.log(e);
      onChange(null);
      setErr(`이미지 업로드 실패. ${e?.message}`);
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/*,.heic,.heif"
        disabled={uploading}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          await handleInsertImage(file);
        }}
        className="border !px-4 !py-1 max-w-full !bg-white rounded-md"
      />

      {err ? <p className="text-red-500 text-sm">{err}</p> : null}
      {uploading ? (
        <p className="text-sm opacity-70">이미지 처리/업로드 중…</p>
      ) : null}

      <div className="flex gap-4 items-center w-full justify-center">
        {preview && <img src={preview} className="max-w-48" />}
        {coverImage && <p>{Math.round(coverImage.size / 1024)}KB</p>}
      </div>
    </div>
  );
}
