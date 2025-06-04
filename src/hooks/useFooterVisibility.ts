import { useState, useEffect, type RefObject } from "react";

export function useFooterVisibility(
  footerRef: RefObject<Element | null>,
  threshold = 0.1
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold,
      }
    );

    observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, [footerRef, threshold]);

  return isVisible;
}
