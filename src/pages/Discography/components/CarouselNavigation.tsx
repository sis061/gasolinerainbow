import { ChevronLeft, ChevronRight } from "lucide-react";
import cx from "classnames";
import type { CarouselNavigationProps } from "@/types/discography";

const CarouselNavigation = ({
  onPrev,
  onNext,
  isFirst,
  isLast,
}: CarouselNavigationProps) => {
  const commonClassName: string =
    "transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none absolute rounded-full top-1/2 -translate-y-1/2 cursor-pointer bg-transparent hover:animate-caret-blink";
  return (
    <>
      <ChevronLeft
        size={40}
        color="#fff"
        onClick={onPrev}
        className={cx(
          commonClassName,
          "-left-3 md:-left-6 lg:-left-12",
          isFirst && "stroke-accent/25"
        )}
      />
      <ChevronRight
        size={40}
        color="#fff"
        onClick={onNext}
        className={cx(
          commonClassName,
          "-right-3 md:-right-6 lg:-right-12",
          isLast && "stroke-accent/25"
        )}
      />
    </>
  );
};

export default CarouselNavigation;
