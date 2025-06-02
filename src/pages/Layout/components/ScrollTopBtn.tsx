import cx from "classnames";
import { useScrollState } from "@/hooks/useScrollState";
import { CircleArrowUp } from "lucide-react";

export default function ScrollTopBtn({
  isFooterVisible,
}: {
  isFooterVisible: boolean;
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isScrolled = useScrollState();

  return (
    <button
      className={cx(
        "cursor-pointer rounded-full max-lg:right-8 right-12 z-50 bg-white/75 hover:bg-white text-black shadow-md transition-all duration-150",
        isFooterVisible
          ? "absolute -top-16 md:-top-16 lg:-top-18"
          : "fixed bottom-32 md:bottom-20 lg:bottom-8",
        isScrolled ? "visible" : "hidden"
      )}
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <CircleArrowUp size={32} />
    </button>
  );
}
