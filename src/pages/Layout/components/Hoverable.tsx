import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Tooltip from "./HoverTooltip";
import Bowser from "bowser";

interface HoverableProps {
  children: React.ReactNode;
  tooltipText: string;
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
  area = { top: 80, bottom: 80, left: 80, right: 80 },
}: HoverableProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isUserAgentPC, setIsUserAgentPC] = useState<boolean>(true);

  const browser = Bowser.getParser(window.navigator.userAgent);
  const platformType = browser.getPlatformType();

  useEffect(() => {
    switch (platformType) {
      case "desktop":
        setIsUserAgentPC(true);
        break;
      case "mobile":
      case "tablet":
        setIsUserAgentPC(false);
        break;
    }
  }, [platformType]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(() => {
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

        frameRef.current = null;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [area]);

  if (!isUserAgentPC) return <>{children}</>;

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
