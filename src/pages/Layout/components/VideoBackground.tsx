import videoBg from "@/assets/vid/bg01.mp4";
import { useRef } from "react";

type Props = {
  onReady?: () => void;
};

export default function VideoBackground({ onReady }: Props) {
  const firedRef = useRef(false);

  // onPlay든 onLoadedData든 먼저 발생한 쪽 하나만 실행되도록 firedRef로 제어.
  // 빠른 반응속도와 최소한의 안정성 보장을 동시에 확보.
  const handleReady = () => {
    if (!firedRef.current) {
      firedRef.current = true;
      onReady?.();
    }
  };
  return (
    <video
      preload="auto"
      className="absolute top-0 left-0 w-full h-full object-cover bg-no-repeat bg-center"
      autoPlay
      muted
      loop
      playsInline
      src={videoBg}
      onPlay={handleReady}
      onCanPlayThrough={handleReady}
    />
  );
}
