import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AutoScrollToTop = (): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default AutoScrollToTop;
