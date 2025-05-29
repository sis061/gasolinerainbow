export default function VideoBackground() {
  return (
    <video
      className="absolute top-0 left-0 w-full h-full object-cover bg-no-repeat bg-center"
      autoPlay
      muted
      loop
      playsInline
      src="/src/assets/vid/bg01.mp4"
    />
  );
}
