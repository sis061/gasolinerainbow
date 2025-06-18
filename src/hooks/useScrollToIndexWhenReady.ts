import { useEffect } from "react";

export default function useScrollToIndexWhenReady<
  T extends { scrollTo: (index: number) => void },
>(ref: React.RefObject<T | null | undefined>, index: number) {
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!ref.current) {
      intervalId = setInterval(() => {
        if (ref.current) {
          ref.current.scrollTo(index);
          clearInterval(intervalId);
        }
      }, 100);
    } else {
      setTimeout(() => {
        ref.current?.scrollTo(index);
      }, 0);
    }

    return () => clearInterval(intervalId);
  }, [ref, index]);
}
