import heic2any from "heic2any";
import imageCompression from "browser-image-compression";

const isIOS = () =>
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export const toWebp = async (file: File) => {
  let f = file;

  const isHeic =
    f.type === "image/heic" ||
    f.type === "image/heif" ||
    /\.(heic|heif)$/i.test(f.name);

  if (isHeic) {
    const result = await heic2any({
      blob: f,
      toType: "image/jpeg",
      quality: 0.92,
    });

    // Blob | Blob[] 모두 대응
    const jpgBlob = Array.isArray(result) ? result[0] : result;

    f = new File([jpgBlob], f.name.replace(/\.(heic|heif)$/i, ".jpg"), {
      type: "image/jpeg",
    });
  }

  // 모바일 안전: 너무 큰 원본은 줄이기
  const maxSide = 4096; // 필요하면 2560으로 더 낮춰도 됨

  const webpBlob = await imageCompression(f, {
    maxSizeMB: 1,
    useWebWorker: !isIOS(), // iOS에서는 worker 끔(안정성)
    fileType: "image/webp",
    initialQuality: 0.85,
    maxWidthOrHeight: maxSide,
  });

  const base = file.name.replace(/\.[^.]+$/, "");
  return new File([webpBlob as Blob], `${base}.webp`, {
    type: "image/webp",
  });
};
