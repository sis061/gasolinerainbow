import { useEffect, useRef } from "react";

type Props = {
  onReady?: () => void;
};

export default function VideoBackground({ onReady }: Props) {
  const firedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleReady = () => {
    if (!firedRef.current) {
      firedRef.current = true;
      onReady?.();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.muted = true;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked. Waiting for user interaction:", err);
          document.body.addEventListener(
            "click",
            () => {
              video
                .play()
                .catch((e) =>
                  console.warn("Still failed after user gesture:", e)
                );
            },
            { once: true }
          );
        });
      }
    };

    // Safari에선 load 후 재생 시도해야 안전함
    video.addEventListener("loadedmetadata", playVideo, { once: true });
  }, []);

  return (
    <video
      ref={videoRef}
      preload="auto"
      className="absolute top-0 left-0 w-full h-full object-cover bg-no-repeat bg-center"
      autoPlay
      muted
      loop
      playsInline
      onPlay={handleReady}
      onCanPlayThrough={handleReady}
    >
      <source src="/bg01.mp4" type="video/mp4" />
    </video>
  );
}
