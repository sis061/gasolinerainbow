import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="transition-all duration-200 ease-in-out relative">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/src/assets/vid/bg01.mp4"
      />
      <Header />
      {children}
      <Footer />
    </main>
  );
}
