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

    video.muted = true;
    video.controls = false;

    const tryPlay = () => {
      video
        .play()
        .then(handleReady)
        .catch((err) => {
          console.warn("Autoplay failed:", err);
        });
    };

    const userInteractionHandler = () => {
      tryPlay();
      document.body.removeEventListener("click", userInteractionHandler);
      document.body.removeEventListener("touchstart", userInteractionHandler);
    };

    // iPad Safari 등 타이밍 이슈 대응
    setTimeout(tryPlay, 100);

    // 사용자 인터랙션 fallback
    document.body.addEventListener("click", userInteractionHandler);
    document.body.addEventListener("touchstart", userInteractionHandler);

    // cleanup
    return () => {
      document.body.removeEventListener("click", userInteractionHandler);
      document.body.removeEventListener("touchstart", userInteractionHandler);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      preload="auto"
      className="absolute top-0 left-0 w-full h-full object-cover bg-no-repeat bg-center pointer-events-none"
      autoPlay
      muted
      loop
      playsInline
      onPlay={handleReady}
      onCanPlayThrough={handleReady}
      poster="/bg02.webp"
    >
      <source src="/bg02.mp4" type="video/mp4" />
    </video>
  );
}
