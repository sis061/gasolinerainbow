import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import Footer from "./Footer";
import Header from "./Header";
import ScrollTopBtn from "@/components/ScrollTopBtn";
import { useLocation } from "react-router-dom";
import cx from "classnames";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import DiscographyFAB from "@/components/DiscographyFAB";
import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";

export default function Layout({ children }: { children: ReactNode }) {
  const { guideButton } = useDiscographyGuideStore();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false);

  const location = useLocation();
  const isDiscography: boolean = location?.pathname === "/discography";
  const isHome: boolean = location?.pathname === "/";

  const minTablet = useMediaQuery({ minWidth: 768 });

  const backgroundColor = isDiscography
    ? "rgba(0, 0, 0, 0.5)"
    : isHome
      ? "rgba(255, 255, 255, 0.25)"
      : "rgba(255, 255, 255, 0.25)";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const currentRef = footerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <motion.main
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      animate={{ backgroundColor }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={cx(
        "transition-all duration-150 ease-in-out relative min-h-screen"
      )}
    >
      <Header />
      {children}
      <div ref={footerRef} className="relative">
        {minTablet && <ScrollTopBtn isFooterVisible={isFooterVisible} />}
        {guideButton && <DiscographyFAB isFooterVisible={isFooterVisible} />}
        <Footer />
      </div>
    </motion.main>
  );
}
