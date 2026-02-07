import { toWebp } from "@/utils/convertImage";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  onChange: (file: string | null) => void;
  folder?: "news" | "notes";
};

/* -----------------------------------------------
 * 1. 모바일(ios) 대응 - heic/heif 일 경우 jpeg로 변환
 * 2. 파일 확장자 webp로 변환 및 용량 축소
 ----------------------------------------------- */

const BUCKET = "media";

export default function ImageUploader({ onChange, folder }: Props) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(webp);
    });
    setCoverImage(webp);
    onChange(url);
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
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          await handleInsertImage(file);
        }}
        className="border !px-4 !py-1 max-w-full !bg-white rounded-md"
      />
      <div className="flex gap-4 items-center w-full justify-center">
        {preview && <img src={preview} className="max-w-48" />}
        {coverImage && <p>{Math.round(coverImage.size / 1024)}KB</p>}
      </div>
    </div>
  );
}
