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

    const playVideo = () => {
      video
        .play()
        .then(handleReady)
        .catch((err) => {
          console.warn("Autoplay failed:", err);

          const userInteractionHandler = () => {
            video.play().then(handleReady).catch(console.warn);
            document.body.removeEventListener("click", userInteractionHandler);
            document.body.removeEventListener(
              "touchstart",
              userInteractionHandler
            );
          };

          // 모바일/데스크탑 모두 대응
          document.body.addEventListener("click", userInteractionHandler);
          document.body.addEventListener("touchstart", userInteractionHandler);
        });
    };

    // 모바일 Safari 등에서 이 타이밍에 play 시도
    video.addEventListener("loadedmetadata", playVideo, { once: true });
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
      poster="/bg01.webp"
    >
      <source src="/bg01.mp4" type="video/mp4" />
    </video>
  );
}
