import { MessageCircleWarning } from "lucide-react";
import { createPortal } from "react-dom";
import cx from "classnames";

interface HoverTooltipProps {
  text: string;
  x: number;
  y: number;
}

const HoverTooltip = ({ text, x, y }: HoverTooltipProps) => {
  return createPortal(
    <div
      className={cx(
        "fixed z-[9999] pointer-events-none transition-all duration-300"
        // animate && "opacity-0 scale-[0.98]"
      )}
      style={{ left: x + 12, top: y - 36 }}
    >
      <div className="flex items-center gap-2 !px-4 !py-2 !text-base !font-medium *:!text-white bg-black/75 shadow-lg backdrop-blur-md max-w-xs">
        <MessageCircleWarning size={18} color="yellow" />
        <span className="leading-tight break-words">{text}</span>
      </div>
    </div>,
    document.body
  );
};

export default HoverTooltip;
