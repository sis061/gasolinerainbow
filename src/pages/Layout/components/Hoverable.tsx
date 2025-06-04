import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

import Tooltip from "./HoverTooltip";

import { throttle } from "lodash";
import { getUserPlatformType } from "@/utils/globalHelper";

interface HoverableProps {
  children: React.ReactNode;
  tooltipText: string;
  isActive?: boolean;
  area?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

const Hoverable = ({
  children,
  tooltipText,
  isActive = true,
  area = { top: 80, bottom: 80, left: 80, right: 80 },
}: HoverableProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const platformType = getUserPlatformType();
  const isUserAgentPC = platformType === "desktop";

  useEffect(() => {
    const throttledMouseMove = throttle((e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const minX = rect.left - (area.left ?? 0);
      const maxX = rect.right + (area.right ?? 0);
      const minY = rect.top - (area.top ?? 0);
      const maxY = rect.bottom + (area.bottom ?? 0);

      const x = e.clientX;
      const y = e.clientY;

      if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
        setCoords({ x, y });
      } else {
        setCoords(null);
      }
    }, 16); // 약 60fps 기준

    document.addEventListener("mousemove", throttledMouseMove);
    return () => {
      document.removeEventListener("mousemove", throttledMouseMove);
      throttledMouseMove.cancel();
    };
  }, [area]);

  if (!isUserAgentPC || !isActive) return <>{children}</>;

  return (
    <>
      <div ref={wrapperRef} className="relative inline-block">
        {children}
      </div>

      {createPortal(
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          {coords && <Tooltip text={tooltipText} x={coords.x} y={coords.y} />}
        </div>,
        document.body
      )}
    </>
  );
};

export default Hoverable;
