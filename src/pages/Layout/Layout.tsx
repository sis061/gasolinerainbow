import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
/************/
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import cx from "classnames";
import Bowser from "bowser";
/************/
import ScrollTopBtn from "@/pages/Layout/components/ScrollTopBtn";
import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";
import Footer from "./Footer";
import Header from "./Header";
import { useMediaQuery } from "react-responsive";
import GuideBtn from "@/pages/Layout/components/GuideBtn";

export default function Layout({ children }: { children: ReactNode }) {
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false);
  const [isUserAgentPC, setIsUserAgentPC] = useState<boolean>(true);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const { hasInteractiveTrackList } = useDiscographyGuideStore();
  const minTablet = useMediaQuery({ minWidth: 768 });
  const browser = Bowser.getParser(window.navigator.userAgent);
  const platformType = browser.getPlatformType();

  const location = useLocation();
  const isDiscography: boolean = location?.pathname === "/discography";
  const backgroundColor = isDiscography
    ? "rgba(0, 0, 0, 0.5)"
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

  useEffect(() => {
    if (!location.pathname.startsWith("/authornote")) {
      sessionStorage.removeItem("authornotePage");
    }
  }, [location.pathname]);

  useLayoutEffect(() => {
    switch (platformType) {
      case "desktop":
        setIsUserAgentPC(true);
        break;
      case "mobile":
      case "tablet":
        setIsUserAgentPC(false);
        break;
    }
  }, [platformType]);

  return (
    <motion.main
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      animate={{ backgroundColor }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cx(
        "transition-all duration-300 ease-in-out relative min-h-screen"
      )}
    >
      <Header />
      {children}
      <div ref={footerRef} className="relative">
        {isDiscography && hasInteractiveTrackList && !isUserAgentPC && (
          <GuideBtn isFooterVisible={isFooterVisible} />
        )}
        {minTablet && <ScrollTopBtn isFooterVisible={isFooterVisible} />}
        <Footer />
      </div>
    </motion.main>
  );
}
