// hooks/useScrollToIndexWhenReady.ts
import { useEffect } from "react";

export default function useScrollToIndexWhenReady<
  T extends { scrollTo: (index: number) => void },
>(
  ref: React.RefObject<T | null | undefined>,
  index: number,
  ready: boolean = true
) {
  useEffect(() => {
    if (!ready) return;

    let intervalId: NodeJS.Timeout | null = null;

    const tryScroll = () => {
      if (ref.current) {
        ref.current.scrollTo(index);
        if (intervalId) clearInterval(intervalId);
      }
    };

    if (!ref.current) {
      intervalId = setInterval(tryScroll, 100);
    } else {
      setTimeout(tryScroll, 0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [index, ready]);
}
