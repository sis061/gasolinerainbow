import { CircleHelp } from "lucide-react";
/************/
import cx from "classnames";
/************/
import useLanguageStore from "@/store/useLanguageStore";
import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";

export default function GuideBtn({
  isFooterVisible,
}: {
  isFooterVisible: boolean;
}) {
  const { language } = useLanguageStore();
  const { showOverlayText, setShowOverlayText } = useDiscographyGuideStore();

  return (
    <button
      className={cx(
        "cursor-pointer rounded-full right-6 md:right-8 lg:right-12 z-50 bg-yellow-500/75 hover:bg-white text-black shadow-md transition-all duration-150",
        isFooterVisible
          ? "absolute -top-16 md:-top-16 lg:-top-18"
          : "fixed bottom-32 lg:bottom-20"
      )}
      aria-label="Discography Info"
      onClick={() => setShowOverlayText(!showOverlayText)}
    >
      <CircleHelp size={40} className="animate-pulse" />
    </button>
  );
}
