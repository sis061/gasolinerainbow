import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { motion } from "framer-motion";
import { CircleAlert } from "lucide-react";

import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";
// import { getUserPlatformType } from "@/utils/globalHelper";

const OverlayText = ({
  targetRef,
  text = "",
}: {
  targetRef: React.RefObject<HTMLElement | null>;
  text: string;
}) => {
  const node = document.getElementById("portal-root");
  if (!node) return null;
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const { hasInteractiveTrackList } = useDiscographyGuideStore();
  //   const platformType = getUserPlatformType();

  useEffect(() => {
    const updatePos = () => {
      if (targetRef?.current) {
        const rect = targetRef.current.getBoundingClientRect();
        // const platformOffset = {
        //   top:
        //     platformType === "mobile" ? rect.height / 2 - 24 : rect.height / 2,
        //   left: platformType === "mobile" ? rect.left + 48 : rect.right + 12,
        // };
        // setPos({
        //   top: rect.top + platformOffset.top,
        //   left: platformOffset.left,
        // });
        setPos({
          top: rect.top + rect.height / 2,
          left: rect.right + 12,
        });
      }
    };
    updatePos();

    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos);
    };
  }, [targetRef]);

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
          className="fixed z-[9999] bg-[#1B1B1B] !px-2 !py-1 text-xs rounded-md rounded-bl-none"
          style={{
            top: pos.top,
            left: pos.left,
            transform: "translateY(-50%)",
          }}
        >
          <div className="flex items-center gap-2 *:!text-white ">
            <CircleAlert size={18} color="yellow" className="animate-pulse" />
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
