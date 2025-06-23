import { CircleHelp } from "lucide-react";

import cx from "classnames";

import useDiscographyStore from "@/store/useDiscographyStore";
import { useCallback, useRef } from "react";

export default function GuideBtn({
  isFooterVisible,
}: {
  isFooterVisible: boolean;
}) {
  const { showOverlayText, setShowOverlayText } = useDiscographyStore();
  const timeoutRef = useRef<number | null>(null);

  const flashOverlay = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (showOverlayText) {
      setShowOverlayText(false);
    } else {
      setShowOverlayText(true);
      timeoutRef.current = window.setTimeout(() => {
        setShowOverlayText(false);
        timeoutRef.current = null;
      }, 1500);
    }
  }, [showOverlayText]);

  return (
    <button
      className={cx(
        "cursor-pointer rounded-full right-6 md:right-8 lg:right-12 z-50 bg-yellow-500/75 hover:bg-white text-black shadow-md transition-all duration-150",
        isFooterVisible
          ? "absolute -top-16 md:-top-16 lg:-top-18"
          : "fixed bottom-20 md:bottom-20 lg:bottom-8"
      )}
      aria-label="Discography Info"
      onClick={flashOverlay}
    >
      <CircleHelp size={40} className="animate-pulse" />
    </button>
  );
}
