import { DrawerTrigger } from "@/components/ui/drawer";
/************/
import cx from "classnames";
import _ from "lodash";
/************/
import type { TrackListProps } from "@/types/discography";
import { AnimatePresence } from "framer-motion";
import OverlayText from "@/pages/Layout/components/OverlayText";
import { useRef } from "react";
import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";
import useLanguageStore from "@/store/useLanguageStore";
import { useMediaQuery } from "react-responsive";

const TrackList = ({
  tracks,
  align = "left",
  onSelect,
  selectedTrack,
}: TrackListProps) => {
  const isRight = align === "right";
  const triggerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { showOverlayText } = useDiscographyGuideStore();
  const { language } = useLanguageStore();
  const minTablet = useMediaQuery({ minWidth: 768 });

  return (
    <ol
      className={cx(
        "touch-pan-y w-full flex flex-col gap-2 [&_>li]:w-full [&_>li]:break-all",
        isRight ? "relative text-right max-md:text-center" : "text-left"
      )}
      onTouchStart={() => {
        // 터치가 시작되면, 혹시 포커스된 버튼이 있으면 모두 blur()
        if (
          document.activeElement instanceof HTMLElement &&
          document.activeElement.tagName === "BUTTON"
        ) {
          (document.activeElement as HTMLElement).blur();
        }
      }}
    >
      {_.map(tracks, (tr, i) => (
        <li key={tr.trackNo} className="touch-pan-y">
          {tr.lyrics ? (
            <>
              <div
                tabIndex={-1}
                onClick={() => onSelect(tr)}
                className={cx(
                  "touch-pan-y cursor-pointer w-auto relative transition-all duration-200 hover:opacity-50",
                  isRight ? "text-right max-md:text-center" : "text-left",
                  minTablet &&
                    selectedTrack?.trackNo === i + 1 &&
                    " [&_>span]:!text-black"
                )}
              >
                {minTablet ? (
                  <span
                    ref={(el) => {
                      triggerRefs.current[i] = el;
                    }}
                    className={cx(
                      minTablet &&
                        selectedTrack?.trackNo === i + 1 &&
                        "!bg-white/75 !px-2"
                    )}
                  >
                    {tr.trackNo}. {tr.title}
                  </span>
                ) : (
                  <DrawerTrigger>
                    <span
                      ref={(el) => {
                        triggerRefs.current[i] = el;
                      }}
                    >
                      {tr.trackNo}. {tr.title}
                    </span>
                  </DrawerTrigger>
                )}
              </div>
              <AnimatePresence mode="wait">
                {showOverlayText && (
                  <OverlayText
                    targetRef={{ current: triggerRefs.current[2] }}
                    text={
                      language === "ko"
                        ? "노래 제목을 눌러 가사 읽기"
                        : "Tab the 'Track Title' to view lyrics"
                    }
                  />
                )}
              </AnimatePresence>
            </>
          ) : (
            <span>
              {tr.trackNo}. {tr.title}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
};

export default TrackList;
