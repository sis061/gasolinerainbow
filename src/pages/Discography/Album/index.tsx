import { useRef, useState, useEffect } from "react";
/************/
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
/************/
import cx from "classnames";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
/************/
import AlbumIntroPanel from "./components/AlbumIntroPanel";
import TrackList from "../components/TrackList";
import LyricsPanel from "../components/LyricsPanel";
import CarouselNavigation from "../components/CarouselNavigation";
import MobileDrawer from "../modals/MobileDrawer";
/************/
import type { CarouselProps, Track } from "@/types/discography";
import useLanguageStore from "@/store/useLanguageStore";
import Hoverable from "@/pages/Layout/components/Hoverable";
import OverlayText from "@/pages/Layout/components/OverlayText";
import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";
import { AnimatePresence } from "framer-motion";

const AlbumCarousel = ({ albumMeta, onChange }: CarouselProps) => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const lyricsRef = useRef<HTMLLIElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();
  const { showOverlayText } = useDiscographyGuideStore();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const { ref, inView } = useInView({
    threshold: 0.01,
    triggerOnce: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(inView);
    }, 50);

    return () => clearTimeout(timeout);
  }, [inView]);

  useEffect(() => {
    if (lyricsRef.current) {
      lyricsRef.current.scrollTop = 0;
    }
  }, [selectedTrack?.lyrics]);

  return (
    <>
      <Carousel
        setApi={(api) => (carouselRef.current = api)}
        opts={{ loop: true, watchDrag: true }}
        className="w-full h-full relative !px-10 lg:!px-20"
      >
        <CarouselContent className="w-full h-[calc(100dvh-8rem)]">
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <AlbumIntroPanel albumMeta={albumMeta} />
          </CarouselItem>
          <CarouselItem className="w-full h-full flex items-center justify-center relative">
            <Drawer>
              <ul className="w-full h-full flex items-center max-md:justify-center lg:!px-10 ">
                <li className="md:!pr-10 w-[45%] max-md:w-full h-full flex flex-col gap-6 items-end max-md:items-center justify-center [&_*]:!text-white overflow-y-scroll">
                  <Hoverable
                    area={{ top: 150, bottom: 20, left: 150, right: 150 }}
                    tooltipText={
                      language === "ko"
                        ? "앨범 소개를 눌러 상세 보기"
                        : "Click 'About' to view details"
                    }
                  >
                    <div className="flex flex-col  gap-6 items-end max-md:items-center justify-center">
                      <span className="text-sm">{albumMeta.year}</span>
                      <span className="text-4xl text-center">
                        {albumMeta.title}
                      </span>
                      <div
                        id="trigger-observer"
                        ref={ref}
                        className="relative inline-block"
                      >
                        <DrawerTrigger
                          ref={triggerRef}
                          onClick={() => setSelectedTrack(null)}
                          className={cx(
                            "cursor-pointer !px-2 transition-all duration-200 hover:opacity-50",
                            minTablet &&
                              !selectedTrack &&
                              "!bg-white/75 [&_>span]:!text-black "
                          )}
                        >
                          <span>
                            {language === "ko" ? "앨범 소개" : "About"}
                          </span>
                          {/* <div
                          className={cx(
                            minTablet &&
                              !selectedTrack &&
                              "absolute w-10 h-full bg-white/75 top-0 -right-10 z-[50] transition-all duration-200"
                          )}
                        /> */}
                        </DrawerTrigger>
                        <AnimatePresence mode="wait">
                          {showOverlayText && (
                            <OverlayText
                              targetRef={triggerRef}
                              text={
                                language === "ko"
                                  ? "앨범 소개를 눌러 상세 보기"
                                  : "Click 'About' to view details"
                              }
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </Hoverable>
                  <Hoverable
                    area={{ top: 10, bottom: 150, left: 80, right: 150 }}
                    tooltipText={
                      language === "ko"
                        ? "노래 제목을 눌러 가사 읽기"
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

        <CarouselNavigation
          onPrev={() => {
            carouselRef.current?.scrollPrev();
            setTimeout(() => setSelectedTrack(null), 200);
          }}
          onNext={() => {
            carouselRef.current?.scrollNext();
            setTimeout(() => setSelectedTrack(null), 200);
          }}
        />
      </Carousel>
    </>
  );
};

export default AlbumCarousel;
