import { useRef, useState, useEffect } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { AnimatePresence } from "framer-motion";

import cx from "classnames";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";

import AlbumIntroPanel from "./components/AlbumIntroPanel";
import TrackList from "../components/TrackList";
import LyricsPanel from "../components/LyricsPanel";
import CarouselNavigation from "../components/CarouselNavigation";
import MobileDrawer from "../modals/MobileDrawer";

import Hoverable from "@/pages/Layout/components/Hoverable";
import OverlayText from "@/pages/Layout/components/OverlayText";

import useLanguageStore from "@/store/useLanguageStore";
import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";
import { useScrollLock } from "@/hooks/useScrollLock";
import useScrollToIndexWhenReady from "@/hooks/useScrollToIndexWhenReady";

import type { CarouselProps, Track } from "@/types/discography";

const AlbumCarousel = ({
  albumMeta,
  isHoverToolip,
  onChange,
  initialSlideIndex = 0,
}: CarouselProps) => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const lyricsRef = useRef<HTMLLIElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const minTablet = useMediaQuery({ minWidth: 768 });

  const { language } = useLanguageStore();
  const { showOverlayText, setShowOverlayText } = useDiscographyGuideStore();
  useScrollLock(open);

  const resetSelectionAndHideOverlay = () => {
    setTimeout(() => setSelectedTrack(null), 200);
    setShowOverlayText(false);
  };

  const handlePrev = () => {
    carouselRef.current?.scrollPrev();
    resetSelectionAndHideOverlay();
  };

  const handleNext = () => {
    carouselRef.current?.scrollNext();
    resetSelectionAndHideOverlay();
  };

  const { ref, inView } = useInView({
    threshold: 0.01,
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

  useScrollToIndexWhenReady(carouselRef, initialSlideIndex);

  return (
    <Carousel
      setApi={(api) => (carouselRef.current = api)}
      opts={{ loop: true, watchDrag: true }}
      className="w-full h-full relative !p-10 lg:!p-20 touch-pan-y "
    >
      <CarouselContent className="w-full h-full flex items-center ">
        <CarouselItem className="w-full h-full flex items-center justify-center ">
          <AlbumIntroPanel albumMeta={albumMeta} />
        </CarouselItem>
        <CarouselItem className="w-full h-auto flex items-center justify-center relative ">
          <Drawer open={open} onOpenChange={setOpen}>
            <ul className="w-full h-full flex items-center max-md:justify-center lg:!px-10 gap-6 ">
              <li className="md:!pr-10 w-[47.5%] max-md:w-full flex flex-col gap-6 items-end max-md:items-center justify-center [&_*]:!text-white !album-track-container">
                <Hoverable
                  isActive={isHoverToolip}
                  area={{ top: 150, bottom: 20, left: 150, right: 300 }}
                  tooltipText={
                    language === "ko"
                      ? "'앨범 소개'를 눌러 상세 보기"
                      : "Click 'About' to view details"
                  }
                >
                  <div
                    ref={ref}
                    className="flex flex-col  gap-6 items-end max-md:items-center justify-center"
                  >
                    <span className="text-sm">{albumMeta.year}</span>
                    <span className="text-4xl text-center md:text-end">
                      {language === "ko"
                        ? albumMeta.titleKr
                        : albumMeta.titleEn}
                    </span>
                    <div
                      id="trigger-observer"
                      ref={triggerRef}
                      onClick={() => setSelectedTrack(null)}
                      className={cx(
                        "relative inline-block touch-pan-y cursor-pointer transition-all duration-200 hover:opacity-50",
                        minTablet &&
                          !selectedTrack &&
                          "!bg-white/75 [&_>span]:!text-black !px-1"
                      )}
                    >
                      {minTablet ? (
                        <span>{language === "ko" ? "앨범 소개" : "About"}</span>
                      ) : (
                        <DrawerTrigger className="touch-pan-y flex items-center gap-2">
                          <span>
                            {language === "ko" ? "앨범 소개" : "About"}
                          </span>
                        </DrawerTrigger>
                      )}
                      <AnimatePresence mode="wait">
                        {showOverlayText && (
                          <OverlayText
                            targetRef={triggerRef}
                            text={
                              language === "ko"
                                ? "앨범 소개를 눌러 상세 보기"
                                : "Tab 'About' to view details"
                            }
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Hoverable>
                <Hoverable
                  isActive={isHoverToolip}
                  area={{ top: 10, bottom: 150, left: 80, right: 300 }}
                  tooltipText={
                    language === "ko"
                      ? "'노래 제목'을 눌러 가사 읽기"
                      : "Click the 'Track Title' to view lyrics"
                  }
                >
                  <TrackList
                    tracks={albumMeta.tracks}
                    align="right"
                    selectedTrack={selectedTrack}
                    onSelect={setSelectedTrack}
                  />
                </Hoverable>
              </li>
              {minTablet ? (
                <LyricsPanel
                  lyricsRef={lyricsRef}
                  selectedTrack={selectedTrack}
                  albumMeta={albumMeta}
                />
              ) : (
                <MobileDrawer
                  selectedTrack={selectedTrack}
                  albumMeta={albumMeta}
                />
              )}
            </ul>
          </Drawer>
        </CarouselItem>
      </CarouselContent>

      <CarouselNavigation onPrev={handlePrev} onNext={handleNext} />
    </Carousel>
  );
};

export default AlbumCarousel;
