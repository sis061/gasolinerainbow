import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { motion } from "framer-motion";
import { CircleAlert } from "lucide-react";

import useDiscographyStore from "@/store/useDiscographyStore";
// import { getUserPlatformType } from "@/utils/globalHelper";

type Direction = "top" | "bottom" | "left" | "right";

const OverlayText = ({
  targetRef,
  text = "",
  direction = "right",
}: {
  targetRef: React.RefObject<HTMLElement | null>;
  text: string;
  direction?: Direction;
}) => {
  const node = document.getElementById("root");
  if (!node) return null;
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const { hasInteractiveTrackList } = useDiscographyStore();
  //   const platformType = getUserPlatformType();

  useEffect(() => {
    const updatePos = () => {
      if (targetRef?.current) {
        const rect = targetRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (direction) {
          case "top":
            top = rect.top - 8; // 위쪽에 약간 떨어지게
            left = rect.left + rect.width / 2;
            break;
          case "bottom":
            top = rect.bottom + 8;
            left = rect.left + rect.width / 2;
            break;
          case "left":
            top = rect.top + rect.height / 2;
            left = rect.left - 8;
            break;
          case "right":
          default:
            top = rect.top + rect.height / 2;
            left = rect.right + 8;
            break;
        }

        setPos({ top, left });
      }
    };
    updatePos();

    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos);
    };
  }, [targetRef, direction]);

  if (!pos) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {hasInteractiveTrackList ? (
        <div
          className="fixed z-[9999] bg-[#1B1B1B] !px-1 !py-1 text-[10px] sm:text-xs rounded-xs rounded-bl-none"
          style={{
            top: pos.top,
            left: pos.left,
            transform:
              direction === "top"
                ? "translate(-50%, -100%)"
                : direction === "bottom"
                  ? "translate(-50%, 0)"
                  : direction === "left"
                    ? "translate(-100%, -50%)"
                    : "translate(0, -50%)",
          }}
        >
          <div className="flex items-center gap-1 sm:gap-1.5 *:!text-white ">
            <CircleAlert size={16} color="yellow" className="animate-pulse" />
            <span className="leading-tight break-words">{text}</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </motion.div>,
    node
  );
};

export default OverlayText;
