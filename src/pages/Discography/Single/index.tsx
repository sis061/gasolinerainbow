import { useRef, useState } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import map from "lodash/map";

import MultipleIntroPanel from "./components/MultipleIntroPanel";
import SingleInfoPanel from "./components/SingleInfoPanel";
import CarouselNavigation from "../components/CarouselNavigation";
import useScrollToIndexWhenReady from "@/hooks/useScrollToIndexWhenReady";

import type { SingleCarouselsProps, Track } from "@/types/discography";

const SingleCarousel = ({
  albumMetas,
  initialSlideIndex = 0,
  ready = false,
  onChange,
}: SingleCarouselsProps) => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  useScrollToIndexWhenReady(carouselRef, initialSlideIndex, ready);

  return (
    <Carousel
      setApi={(api) => (carouselRef.current = api)}
      opts={{ loop: true, watchDrag: true }}
      className="w-full h-full relative !p-10 lg:!p-20"
    >
      <CarouselContent className="w-full h-full flex items-center ">
        <CarouselItem className="w-full h-full flex items-center justify-center">
          <MultipleIntroPanel
            image={albumMetas[0].image}
            title="EPs & SINGLEs"
            year={2021}
          />
        </CarouselItem>
        {map(albumMetas, (albumMeta, i) => (
          <CarouselItem
            key={i}
            className="w-full h-auto flex items-center justify-center !px-1 md:!px-5"
          >
            <SingleInfoPanel
              albumMeta={albumMeta}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
              // isHoverToolip={false}
              isHoverToolip={i === 0}
              onChange={i === 0 ? onChange : undefined}
            />
          </CarouselItem>
        ))}
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
  );
};

export default SingleCarousel;
