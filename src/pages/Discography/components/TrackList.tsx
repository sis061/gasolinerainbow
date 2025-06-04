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

const TrackList = ({
  tracks,
  align = "left",
  onSelect,
  selectedTrack,
}: TrackListProps) => {
  const isRight = align === "right";
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { showOverlayText } = useDiscographyGuideStore();
  const { language } = useLanguageStore();

  return (
    <ol
      className={cx(
        "w-full flex flex-col gap-2 [&_>li]:w-full [&_>li]:break-all",
        isRight ? "relative text-right max-md:text-center" : "text-left"
      )}
    >
      {_.map(tracks, (tr, i) => (
        <li key={tr.trackNo}>
          {tr.lyrics ? (
            <>
              <DrawerTrigger
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                onClick={() => onSelect(tr)}
                className={cx(
                  "cursor-pointer !px-2 relative transition-all duration-200 hover:opacity-50",
                  isRight ? "text-right max-md:text-center" : "text-left",
                  selectedTrack?.trackNo === i + 1 &&
                    "!bg-white/75 [&_>span]:!text-black"
                )}
              >
                <span>
                  {tr.trackNo}. {tr.title}
                </span>
              </DrawerTrigger>
              <AnimatePresence mode="wait">
                {showOverlayText && (
                  <OverlayText
                    targetRef={{ current: triggerRefs.current[2] }}
                    text={
                      language === "ko"
                        ? "노래 제목을 눌러 가사 읽기"
                        : "Click the 'Track Title' to view lyrics"
                    }
                  />
                )}
              </AnimatePresence>
            </>
          ) : (
            <span className="!px-1.5">
              {tr.trackNo}. {tr.title}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
};

export default TrackList;
