import { toWebp } from "@/utils/convertImage";
import { useEffect, useState } from "react";

type Props = {
  onChange: (file: File | null) => void;
};

/* -----------------------------------------------
 * 1. 모바일(ios) 대응 - heic/heif 일 경우 jpeg로 변환
 * 2. 파일 확장자 webp로 변환 및 용량 축소
 ----------------------------------------------- */

export default function ImageUploader({ onChange }: Props) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

          const webp = await toWebp(file);
          setPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(webp);
          });

          setCoverImage(webp);
          onChange(webp);
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
