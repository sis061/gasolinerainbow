import { CircleArrowUp } from "lucide-react";
import cx from "classnames";
import { useScrollState } from "@/hooks/useScrollState";

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
        "cursor-pointer fixed rounded-full max-md:right-5 right-12 z-50 bg-white/75 hover:bg-white text-black shadow-md transition-all duration-150",
        isFooterVisible
          ? "bottom-64 md:bottom-44 lg:bottom-32"
          : "bottom-32 md:bottom-20 lg:bottom-8",
        isScrolled ? "visible" : "hidden"
      )}
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <CircleArrowUp size={40} />
    </button>
  );
}
