import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import cx from "classnames";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { toast } from "sonner";
import { ListX } from "lucide-react";

import map from "lodash/map";

import MultipleIntroPanel from "../Single/components/MultipleIntroPanel";
import StreamingModal from "../modals/StreamingModal";
import CarouselNavigation from "../components/CarouselNavigation";
import BuyingModal from "../modals/BuyingModal";

import type { SingleCarouselsProps } from "@/types/discography";
import useScrollToIndexWhenReady from "@/hooks/useScrollToIndexWhenReady";
import useLanguageStore from "@/store/useLanguageStore";
import CustomToast from "@/pages/Layout/components/CustomToast";

const OSTCarousel = ({
  albumMetas,
  initialSlideIndex = 0,
  ready = false,
  // , onChange
}: SingleCarouselsProps) => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const [imageLoadState, setImageLoadState] = useState<boolean[]>(
    Array(albumMetas.length).fill(false)
  );
  const [isApiReady, setIsApiReady] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSlideIndex);
  const [lastIndex, setLastIndex] = useState<number>(0);
  const { language } = useLanguageStore();

  useEffect(() => {
    if (!isApiReady || !carouselRef.current) return;
    const api = carouselRef.current;

    setSelectedIndex(api.selectedScrollSnap());
    setLastIndex(api.scrollSnapList().length - 1);

    const handleSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [isApiReady]);

  // useEffect(() => {
  //   onChange && onChange(false);
  // }, []);

  useScrollToIndexWhenReady(carouselRef, initialSlideIndex, ready);

  return (
    <Carousel
      setApi={(api) => {
        carouselRef.current = api;
        setIsApiReady(true);
      }}
      opts={{ loop: true, watchDrag: true }}
      className="w-full h-full relative !p-10 lg:!p-20"
    >
      <CarouselContent className="w-full h-full flex items-center">
        <CarouselItem className="w-full h-auto flex items-center justify-center">
          <MultipleIntroPanel
            image={albumMetas[0].image}
            title="ORIGINAL SOUNDTRACKs"
            year={2024}
          />
        </CarouselItem>
        {map(albumMetas, (albumMeta, i) => {
          const isBandcampAvailable = Object.keys(albumMeta.urls).includes(
            "bandcamp"
          );
          const isStreamingAvailable =
            !!albumMeta.urls?.appleMusic || !!albumMeta.urls?.melon;
          return (
            <CarouselItem
              key={i}
              className="w-full h-auto flex items-center justify-center"
            >
              <ul className="w-full h-auto md:h-full flex max-md:flex-col gap-10 items-center justify-center max-md:!px-2.5">
                <li className="md:w-2/3 w-full h-auto flex md:flex-col md:gap-10 gap-5 items-center justify-between md:justify-start">
                  <div className="w-1/2 md:w-3/4 xl:w-1/2 overflow-hidden relative !aspect-square">
                    <div className="absolute inset-0 w-full h-full">
                      {!imageLoadState[i] && (
                        <Skeleton className="w-full h-full rounded-none bg-[#333]" />
                      )}
                      <img
                        src={albumMeta.image}
                        alt="앨범 아트워크"
                        className={cx(
                          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                          imageLoadState[i] ? "opacity-100" : "opacity-0"
                        )}
                        onLoad={() => {
                          setImageLoadState((prev) => {
                            const next = [...prev];
                            next[i] = true;
                            return next;
                          });
                        }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-1/2 md:w-full justify-center items-center max-md:items-start gap-2 [&_*]:!text-white ">
                    <span className="text-sm">{albumMeta.year}</span>
                    <span className="text-3xl !pb-4 max-md:text-xl max-md:font-bold">
                      {language === "ko"
                        ? albumMeta.titleKr
                        : albumMeta.titleEn}
                    </span>
                    <div className="!space-x-4">
                      {isStreamingAvailable && (
                        <StreamingModal albumMeta={albumMeta} />
                      )}
                      {isBandcampAvailable && (
                        <BuyingModal albumMeta={albumMeta} />
                      )}
                    </div>
                  </div>
                </li>
                <li className="w-1/3 max-md:w-full max-md:text-center flex flex-col max-h-[85%] overflow-scroll justify-start items-start gap-2">
                  <ol className="w-full flex flex-col [&_>li]:w-full [&_>li]:break-all gap-2 ">
                    {map(albumMeta.tracks, (tr) => (
                      <li key={tr.trackNo}>
                        <span
                          className="!text-white cursor-not-allowed"
                          onClick={() =>
                            toast.custom((t) => (
                              <CustomToast
                                t={t}
                                icon={<ListX size={20} color="#000" />}
                                content={
                                  language === "ko"
                                    ? "가사가 없는 곡입니다 :)"
                                    : "Instrumental track - no lyrics :)"
                                }
                              />
                            ))
                          }
                        >
                          {tr.trackNo}.{" "}
                          {language === "ko" ? tr.titleKr : tr.titleEn}
                        </span>
                      </li>
                    ))}
                  </ol>
                </li>
              </ul>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselNavigation
        onPrev={() => {
          carouselRef.current?.scrollPrev();
        }}
        onNext={() => {
          carouselRef.current?.scrollNext();
        }}
        isFirst={selectedIndex === 0}
        isLast={selectedIndex === lastIndex}
      />
    </Carousel>
  );
};

export default OSTCarousel;
