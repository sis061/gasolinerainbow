import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselNavigationProps } from "@/types/discography";

const CarouselNavigation = ({ onPrev, onNext }: CarouselNavigationProps) => (
  <>
    <ChevronLeft
      size={40}
      color="#fff"
      onClick={onPrev}
      className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none absolute rounded-full top-1/2 -left-3 md:-left-6 lg:-left-12 -translate-y-1/2 cursor-pointer bg-transparent"
    />
    <ChevronRight
      size={40}
      color="#fff"
      onClick={onNext}
      className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none absolute rounded-full top-1/2 -right-3 md:-right-6 lg:-right-12 -translate-y-1/2 cursor-pointer bg-transparent"
    />
  </>
);

export default CarouselNavigation;
