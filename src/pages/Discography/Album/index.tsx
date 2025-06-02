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
import { cx } from "class-variance-authority";
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

const AlbumCarousel = ({ albumMeta, onChange }: CarouselProps) => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const lyricsRef = useRef<HTMLLIElement | null>(null);
  const minLaptop = useMediaQuery({ minWidth: 768 });
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
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <Drawer>
              <ul className="w-full h-full flex items-center max-md:justify-center lg:!px-10 ">
                <li className="md:!pr-10 w-[45%] max-md:w-full h-full flex flex-col gap-6 items-end max-md:items-center justify-center [&_*]:!text-white overflow-y-scroll">
                  <span className="text-sm">{albumMeta.year}</span>
                  <span className="text-4xl text-center">
                    {albumMeta.title}
                  </span>
                  <div id="trigger-observer" ref={ref}>
                    <DrawerTrigger
                      onClick={() => setSelectedTrack(null)}
                      className={cx(
                        "cursor-pointer !px-2 relative transition-all duration-200 hover:opacity-50",
                        minLaptop &&
                          !selectedTrack &&
                          "!bg-white/75 [&_>span]:!text-black "
                      )}
                    >
                      <span>앨범 소개</span>
                      {/* <div
                          className={cx(
                            minLaptop &&
                              !selectedTrack &&
                              "absolute w-10 h-full bg-white/75 top-0 -right-10 z-[50] transition-all duration-200"
                          )}
                        /> */}
                    </DrawerTrigger>
                  </div>
                  <TrackList
                    tracks={albumMeta.tracks}
                    align="right"
                    selectedTrack={selectedTrack}
                    onSelect={setSelectedTrack}
                  />
                </li>
                {minLaptop ? (
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
