import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircleAlert } from "lucide-react";
import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";

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

  useEffect(() => {
    const updatePos = () => {
      if (targetRef?.current) {
        const rect = targetRef.current.getBoundingClientRect();
        setPos({
          top: rect.top + rect.height / 2,
          left: rect.right + 3,
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
      transition={{ duration: 0.15, ease: "easeInOut" }}
    >
      {hasInteractiveTrackList ? (
        <div
          className="fixed z-[9999] bg-[#1B1B1B] !px-3 !py-1 text-xs"
          style={{
            top: pos.top,
            left: pos.left,
            transform: "translateY(-50%)",
          }}
        >
          <div className="flex items-center gap-2 *:!text-white ">
            <CircleAlert size={18} color="yellow" />
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
