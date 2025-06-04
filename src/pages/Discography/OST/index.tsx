import { useRef } from "react";
/************/
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
/************/
import _ from "lodash";
/************/
import MultipleIntroPanel from "../Single/components/MultipleIntroPanel";
import StreamingModal from "../modals/StreamingModal";
import CarouselNavigation from "../components/CarouselNavigation";
/************/
import type { SingleCarouselsProps } from "@/types/discography";
import useLanguageStore from "@/store/useLanguageStore";

const OSTCarousel = ({
  albumMetas,
  // , onChange
}: SingleCarouselsProps) => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const { language } = useLanguageStore();

  // useEffect(() => {
  //   onChange && onChange(false);
  // }, []);

  return (
    <>
      <Carousel
        setApi={(api) => (carouselRef.current = api)}
        opts={{ loop: true, watchDrag: true }}
        className="w-full h-full relative !px-10 lg:!px-20"
      >
        <CarouselContent className="w-full h-[calc(100dvh-8rem)]">
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <MultipleIntroPanel
              image={albumMetas[0].image}
              title="ORIGINAL SOUNDTRACKs"
              year={2024}
            />
          </CarouselItem>
          {_.map(albumMetas, (albumMeta, i) => (
            <CarouselItem
              key={i}
              className="w-full h-full flex items-center justify-center"
            >
              <ul className="w-full h-auto md:h-full flex max-md:flex-col gap-10 items-center justify-center max-md:!px-2.5">
                <li className="w-2/3 max-md:w-full h-auto flex flex-col max-md:flex-row gap-10 max-md:gap-5 items-center justify-start">
                  <div className="max-w-1/2 md:max-w-3/4 xl:w-1/2 bg-gray-600 overflow-hidden ">
                    <img
                      src={albumMeta.image}
                      alt="앨범 아트워크"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col w-full justify-center items-center max-md:items-start gap-2 [&_*]:!text-white">
                    <span className="text-sm">{albumMeta.year}</span>
                    <span className="text-3xl !pb-4 max-md:text-xl max-md:font-bold">
                      {language === "ko"
                        ? albumMeta.titleKr
                        : albumMeta.titleEn}
                    </span>
                    <StreamingModal albumMeta={albumMeta} />
                  </div>
                </li>
                <li className="w-1/3 max-md:w-full max-md:text-center flex flex-col max-h-[85%] overflow-scroll justify-start items-start gap-2">
                  <ol className="w-full flex flex-col [&_>li]:w-full [&_>li]:break-all gap-2 ">
                    {_.map(albumMeta.tracks, (tr) => (
                      <li key={tr.trackNo}>
                        <span className="!text-white">
                          {tr.trackNo}.{" "}
                          {language === "ko" ? tr.titleKr : tr.titleEn}
                        </span>
                      </li>
                    ))}
                  </ol>
                </li>
              </ul>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation
          onPrev={() => {
            carouselRef.current?.scrollPrev();
          }}
          onNext={() => {
            carouselRef.current?.scrollNext();
          }}
        />
      </Carousel>
    </>
  );
};

export default OSTCarousel;
