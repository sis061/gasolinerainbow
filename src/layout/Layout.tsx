import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="transition-all duration-200 ease-in-out">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
