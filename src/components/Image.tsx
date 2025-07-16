import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import cx from "classnames";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  zoomable?: boolean;
}

export const Image = ({ className, zoomable = true, ...props }: ImageProps) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    if (!isZoomed) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isZoomed]);

  if (hasError) {
    return (
      <Skeleton
        className={cx("w-full h-full rounded-none bg-[#333]", className)}
      />
    );
  }

  return (
    <>
      <img
        {...props}
        onClick={() => zoomable && setIsZoomed(true)}
        onError={() => setHasError(true)}
        className={cx("", zoomable && "cursor-zoom-in", className)}
      />
      {createPortal(
        <AnimatePresence>
          {isZoomed && !hasError && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center cursor-zoom-out !p-4 md:!p-10"
            >
              <button
                className="absolute top-4.5 right-4.5 cursor-pointer"
                onClick={() => setIsZoomed(false)}
              >
                <X size={28} color="#fff" />
              </button>
              <motion.img
                key="zoomed-image"
                loading="eager"
                src={props.src}
                alt={props.alt ?? ""}
                initial={{ scale: 0.9, opacity: 1 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="max-w-full max-h-full md:h-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
