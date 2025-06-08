import { useRef, useEffect } from "react";
/************/
import { CarouselItem } from "@/components/ui/carousel";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
/************/
import { cx } from "class-variance-authority";
// import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
/************/
import { renderDiskType } from "@/utils/globalHelper";
import useLanguageStore from "@/store/useLanguageStore";
/************/
import TrackList from "../../components/TrackList";
import LyricsPanel from "../../components/LyricsPanel";
import StreamingModal from "../../modals/StreamingModal";
import MobileDrawer from "../../modals/MobileDrawer";
/************/
import type { SingleInfoPanelProps } from "@/types/discography";
import Hoverable from "@/pages/Layout/components/Hoverable";

const SingleInfoPanel = ({
  albumMeta,
  selectedTrack,
  setSelectedTrack,
  isHoverToolip = false,
  // onChange,
}: SingleInfoPanelProps) => {
  const lyricsRef = useRef<HTMLLIElement | null>(null);
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
    <CarouselItem className="w-full h-full flex items-center justify-center !px-2.5 md:!px-5">
      <Drawer>
        <ul className="w-full h-full flex items-center max-md:justify-center max-xl:gap-16">
          <li className="w-1/2 max-md:w-full h-full flex flex-col gap-6 items-center justify-center [&_*]:!text-white overflow-y-scroll">
            <div className="w-full xl:w-3/4 bg-gray-600 overflow-hidden ">
              <img
                src={albumMeta.image}
                alt="앨범 아트워크"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <ul className="flex max-md:gap-3 max-lg:gap-5 max-xl:gap-7 gap-10 w-full justify-between items-start [&_*]:!text-white ">
              <li className="w-1/2 h-full flex flex-col items-end justify-center gap-2">
                <div className="flex justify-end items-center gap-2 [&_>span]:text-sm">
                  <span>{albumMeta.year}</span>
                  <span>{language === "ko" ? type.kr : type.en}</span>
                </div>
                <span className="text-3xl text-end !pb-4 max-md:text-2xl max-md:font-bold">
                  {language === "ko" ? albumMeta.titleKr : albumMeta.titleEn}
                </span>
                <StreamingModal albumMeta={albumMeta} />
                {albumMeta.isCD && albumMeta.cdUrl && (
                  <div className="transition-all duration-200 hover:opacity-50">
                    <Link
                      to={albumMeta.cdUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {language === "ko" ? "CD 구매" : "Order"}
                    </Link>
                  </div>
                )}
              </li>
              <li
                id="trigger-observer"
                // ref={ref}
                className="w-1/2 flex flex-col justify-start items-start gap-2"
              >
                <div
                  onClick={() => setSelectedTrack(null)}
                  className={cx(
                    "cursor-pointer !px-2 relative w-auto text-left transition-all duration-200 hover:opacity-50",
                    minTablet &&
                      !selectedTrack &&
                      "!bg-white/75 [&_>span]:!text-black"
                  )}
                >
                  {minTablet ? (
                    <span>
                      {language === "ko" ? `${type.kr} 소개` : `About`}
                    </span>
                  ) : (
                    <DrawerTrigger>
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
    </CarouselItem>
  );
};

export default SingleInfoPanel;
