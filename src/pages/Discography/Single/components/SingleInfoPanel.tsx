import { useRef, useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { AnimatePresence } from "framer-motion";

import cx from "classnames";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";

import { renderDiskType } from "@/utils/globalHelper";
import useLanguageStore from "@/store/useLanguageStore";
import useDiscographyStore from "@/store/useDiscographyStore";

import TrackList from "../../components/TrackList";
import LyricsPanel from "../../components/LyricsPanel";
import StreamingModal from "../../modals/StreamingModal";
import MobileDrawer from "../../modals/MobileDrawer";
import BuyingModal from "../../modals/BuyingModal";

import Hoverable from "@/pages/Layout/components/Hoverable";
import OverlayText from "@/pages/Layout/components/OverlayText";

import type { SingleInfoPanelProps } from "@/types/discography";
// import { useScrollLock } from "@/hooks/useScrollLock";

const SingleInfoPanel = ({
  albumMeta,
  selectedTrack,
  setSelectedTrack,
  isHoverToolip = false,
  onChange,
}: SingleInfoPanelProps) => {
  const lyricsRef = useRef<HTMLLIElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  // useScrollLock(open);

  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();
  const type = renderDiskType(albumMeta.type);
  const isBandcampAvailable = Object.keys(albumMeta.urls).includes("bandcamp");
  const isStreamingAvailable =
    !!albumMeta.urls?.appleMusic || !!albumMeta.urls?.melon;
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onChange) {
        onChange(inView);
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [inView]);

  useEffect(() => {
    if (lyricsRef.current) {
      lyricsRef.current.scrollTop = 0;
    }
  }, [selectedTrack?.lyrics]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <ul className="w-full h-full flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-0 !px-2 md:!px-0">
        <li className="flex gap-6 w-full h-full md:w-1/2 [&_*]:!text-white items-center justify-center">
          <ol className="flex flex-col items-center gap-4 md:gap-6 w-full h-full">
            <li className="w-full sm:w-3/4 lg:w-2/3 overflow-hidden relative !aspect-square">
              <div className="absolute inset-0 w-full h-full">
                {!isImageLoaded && (
                  <Skeleton className="w-full h-full rounded-none bg-[#333]" />
                )}
                <img
                  src={albumMeta.image}
                  alt="앨범 아트워크"
                  className={cx(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setIsImageLoaded(true)}
                  loading="lazy"
                />
              </div>
            </li>
            <Trigger
              {...{
                albumMeta,
                selectedTrack,
                setSelectedTrack,
                isHoverToolip,
                language,
                minTablet,
                type,
                ref,
              }}
            />
          </ol>
        </li>
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col items-center md:items-start justify-center gap-2 [&_*]:!text-white">
            <div className="flex justify-start items-center gap-2 [&_>span]:text-sm">
              <span>{albumMeta.year}</span>
            </div>
            <span className="text-3xl !pb-2 md:!pb-4 max-md:text-2xl max-md:font-bold max-md:text-center">
              {language === "ko" ? albumMeta.titleKr : albumMeta.titleEn}
            </span>
            <div className="flex flex-wrap justify-end gap-x-4 gap-y-0.5">
              {isStreamingAvailable && <StreamingModal albumMeta={albumMeta} />}
              {isBandcampAvailable && <BuyingModal albumMeta={albumMeta} />}
            </div>
          </div>
          {minTablet ? (
            <LyricsPanel
              type="others"
              lyricsRef={lyricsRef}
              selectedTrack={selectedTrack}
              albumMeta={albumMeta}
            />
          ) : (
            <MobileDrawer selectedTrack={selectedTrack} albumMeta={albumMeta} />
          )}
        </div>
      </ul>
    </Drawer>
  );
};

export default SingleInfoPanel;

interface TriggerProps extends Omit<SingleInfoPanelProps, "onChange"> {
  language: "ko" | "en";
  minTablet: boolean;
  type: {
    kr: string;
    en: string;
  };
  ref?: (node?: Element | null) => void;
}

const Trigger = (props: TriggerProps) => {
  const {
    albumMeta,
    selectedTrack,
    setSelectedTrack,
    isHoverToolip,
    language,
    minTablet,
    type,
    ref,
  } = props;
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const { showOverlayText } = useDiscographyStore();

  return (
    <li className="flex flex-col gap-6 w-full items-center justify-center">
      <div
        id="trigger-observer"
        ref={ref}
        className="flex flex-col justify-center items-center gap-2"
      >
        <Hoverable
          isActive={isHoverToolip}
          area={{ top: 150, bottom: 0, left: 150, right: 300 }}
          tooltipText={
            language === "ko"
              ? "'싱글 소개'를 눌러 상세 보기"
              : "Click 'About' to view details"
          }
        >
          <div
            ref={triggerRef}
            onClick={() => setSelectedTrack(null)}
            className={cx(
              "cursor-pointer relative w-auto transition-all duration-200 hover:opacity-50 ",
              minTablet &&
                !selectedTrack &&
                "!bg-white/75 [&_>span]:!text-black !px-1"
            )}
          >
            {minTablet ? (
              <span>{language === "ko" ? `${type.kr} 소개` : `About`}</span>
            ) : (
              <DrawerTrigger className="touch-pan-y flex items-center gap-2">
                <span>{language === "ko" ? `${type.kr} 소개` : `About`}</span>
              </DrawerTrigger>
            )}
            <AnimatePresence mode="wait">
              {showOverlayText && (
                <OverlayText
                  targetRef={triggerRef}
                  text={
                    language === "ko"
                      ? "소개를 눌러 상세 보기"
                      : "Tab 'About' to view details"
                  }
                />
              )}
            </AnimatePresence>
          </div>
        </Hoverable>
        <Hoverable
          isActive={isHoverToolip}
          area={{ top: 0, bottom: 150, left: 200, right: 300 }}
          tooltipText={
            language === "ko"
              ? "'노래 제목'을 눌러 가사 읽기"
              : "Click the 'Track Title' to view lyrics"
          }
        >
          <TrackList
            tracks={albumMeta.tracks}
            align="center"
            selectedTrack={selectedTrack}
            onSelect={setSelectedTrack}
          />
        </Hoverable>
      </div>
    </li>
  );
};
