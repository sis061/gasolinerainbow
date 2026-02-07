import heic2any from "heic2any";
import imageCompression from "browser-image-compression";

export const toWebp = async (file: File) => {
  let f = file;

  const isHeic =
    f.type === "image/heic" ||
    f.type === "image/heif" ||
    /\.(heic|heif)$/i.test(f.name);

  if (isHeic) {
    const jpg = (await heic2any({
      blob: f,
      toType: "image/jpeg",
      quality: 0.92,
    })) as Blob;

    f = new File([jpg], f.name.replace(/\.(heic|heif)$/i, ".jpg"), {
      type: "image/jpeg",
    });
  }

  const webpBlob = await imageCompression(f, {
    maxSizeMB: 1,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.85,
    maxWidthOrHeight: 99999,
  });

  const base = file.name.replace(/\.[^.]+$/, "");
  return new File([webpBlob as Blob], `${base}.webp`, {
    type: "image/webp",
  });
};
