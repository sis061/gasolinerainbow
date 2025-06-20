import { useRef, useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

import cx from "classnames";
// import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { renderDiskType } from "@/utils/globalHelper";
import useLanguageStore from "@/store/useLanguageStore";

import TrackList from "../../components/TrackList";
import LyricsPanel from "../../components/LyricsPanel";
import StreamingModal from "../../modals/StreamingModal";
import MobileDrawer from "../../modals/MobileDrawer";

import type { SingleInfoPanelProps } from "@/types/discography";
import Hoverable from "@/pages/Layout/components/Hoverable";
import { useScrollLock } from "@/hooks/useScrollLock";
import { Disc3 } from "lucide-react";

const SingleInfoPanel = ({
  albumMeta,
  selectedTrack,
  setSelectedTrack,
  isHoverToolip = false,
  // onChange,
}: SingleInfoPanelProps) => {
  const lyricsRef = useRef<HTMLLIElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useScrollLock(open);

  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();
  const type = renderDiskType(albumMeta.type);
  // const { ref, inView } = useInView({
  //   threshold: 0.5,
  //   triggerOnce: false,
  // });

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (onChange) {
  //       onChange(inView);
  //     }
  //   }, 50);

  //   return () => clearTimeout(timeout);
  // }, [inView]);

  useEffect(() => {
    if (lyricsRef.current) {
      lyricsRef.current.scrollTop = 0;
    }
  }, [selectedTrack?.lyrics]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <ul className="w-full h-full flex items-center justify-between gap-10 !px-2">
        <li className="w-full md:w-1/2 xl:w-[45%] h-full flex flex-col gap-6 items-start justify-center [&_*]:!text-white overflow-y-scroll">
          <div className="w-full overflow-hidden relative !aspect-square">
            {!isImageLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-[#333]" />
            )}
            <img
              src={albumMeta.image}
              alt="앨범 아트워크"
              className={cx(
                "w-full h-full object-cover transition-opacity duration-500",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
          </div>
          <ul className="flex gap-6 w-full justify-between items-start [&_*]:!text-white">
            <li className="w-[45%] h-full flex flex-col items-end justify-center gap-2">
              <div className="flex justify-end items-center gap-2 [&_>span]:text-sm">
                <span>{albumMeta.year}</span>
                <span>{language === "ko" ? type.kr : type.en}</span>
              </div>
              <span className="text-3xl text-end !pb-4 max-md:text-2xl max-md:font-bold">
                {language === "ko" ? albumMeta.titleKr : albumMeta.titleEn}
              </span>
              <StreamingModal albumMeta={albumMeta} />
              {albumMeta.isCD && albumMeta.cdUrl && (
                <div className="transition-all duration-200 hover:opacity-50 group">
                  <Link
                    to={albumMeta.cdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-all duration-200"
                  >
                    <Disc3 size={16} className="group-hover:animate-spin" />
                    {language === "ko" ? "CD 구매" : "Order"}
                  </Link>
                </div>
              )}
            </li>
            <li
              id="trigger-observer"
              // ref={ref}
              className="w-[55%] flex flex-col justify-start items-start gap-2"
            >
              <div
                onClick={() => setSelectedTrack(null)}
                className={cx(
                  "cursor-pointer relative w-auto text-left transition-all duration-200 hover:opacity-50 ",
                  minTablet &&
                    !selectedTrack &&
                    "!bg-white/75 [&_>span]:!text-black !px-1"
                )}
              >
                {minTablet ? (
                  <span>{language === "ko" ? `${type.kr} 소개` : `About`}</span>
                ) : (
                  <DrawerTrigger className="touch-pan-y flex items-center gap-2">
                    <span>
                      {language === "ko" ? `${type.kr} 소개` : `About`}
                    </span>
                  </DrawerTrigger>
                )}
              </div>
              <Hoverable
                isActive={isHoverToolip}
                area={{ top: 300, bottom: 100, left: 200, right: 300 }}
                tooltipText={
                  language === "ko"
                    ? "'노래 제목'을 눌러 가사 읽기"
                    : "Click the 'Track Title' to view lyrics"
                }
              >
                <TrackList
                  tracks={albumMeta.tracks}
                  align="left"
                  selectedTrack={selectedTrack}
                  onSelect={setSelectedTrack}
                />
              </Hoverable>
            </li>
          </ul>
        </li>
        {minTablet ? (
          <LyricsPanel
            lyricsRef={lyricsRef}
            selectedTrack={selectedTrack}
            albumMeta={albumMeta}
          />
        ) : (
          <MobileDrawer selectedTrack={selectedTrack} albumMeta={albumMeta} />
        )}
      </ul>
    </Drawer>
  );
};

export default SingleInfoPanel;
