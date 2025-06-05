import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
/************/
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import cx from "classnames";
import { useMediaQuery } from "react-responsive";
/************/
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopBtn from "@/pages/Layout/components/ScrollTopBtn";
import GuideBtn from "@/pages/Layout/components/GuideBtn";
import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";
import { getUserPlatformType } from "@/utils/globalHelper";
import { useFooterVisibility } from "@/hooks/useFooterVisibility";

export default function Layout({ children }: { children: ReactNode }) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const isFooterVisible = useFooterVisibility(footerRef, 0.1);
  const platformType = getUserPlatformType();
  const isUserAgentPC = platformType === "desktop";

  const minTablet = useMediaQuery({ minWidth: 768 });

  const { pathname } = useLocation();
  const isDiscography = pathname === "/discography";
  const isNotes = pathname.startsWith("/authornote");

  const { hasInteractiveTrackList } = useDiscographyGuideStore();

  const backgroundColor =
    isDiscography || isNotes
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(255, 255, 255, 0.25)";

  useEffect(() => {
    if (!pathname.startsWith("/authornote")) {
      sessionStorage.removeItem("authornotePage");
    }
  }, [pathname]);

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
        {/* Discography 페이지, 트랙리스트 상호작용 활성 상태, 모바일/태블릿일 때만 GuideBtn 보여주기 */}
        {isDiscography && hasInteractiveTrackList && !isUserAgentPC && (
          <GuideBtn isFooterVisible={isFooterVisible} />
        )}
        {minTablet && <ScrollTopBtn isFooterVisible={isFooterVisible} />}
        <Footer />
      </div>
    </motion.main>
  );
}
