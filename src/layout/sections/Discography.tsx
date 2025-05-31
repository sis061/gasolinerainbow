import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ChevronLeft, ChevronRight, X } from "lucide-react";

import mockImg from "@/assets/images/HM.jpg";
import { useRef, useState } from "react";

import { mockDiskData } from "@/layout/sections/mockDiskData";
import _ from "lodash";
import cx from "classnames";
import { useMediaQuery } from "react-responsive";

export default function Discography() {
  return (
    <section className="wrapper-full w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center ">
      <div className="inner-full flex-grow-0 w-full h-full ">
        {/* 정규 앨범 컴포넌트 형식 */}
        <AlbumCarousel albumMeta={mockDiskData[0]} />
        {/* EP Single, OST 컴포넌트 형식 */}
        <OthersCarousel />
        <OSTCarousel />
      </div>
    </section>
  );
}

const AlbumCarousel = ({ albumMeta }) => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const minLaptop = useMediaQuery({ minWidth: 768 });
  const [selectedTrack, setSelectedTrack] = useState(null);

  return (
    <>
      <Carousel
        setApi={(api) => (carouselRef.current = api)}
        opts={{ loop: true, watchDrag: true }}
        className="w-full h-full relative !px-10 lg:!px-20"
      >
        <CarouselContent className="w-full h-[calc(100dvh-8rem)] ">
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <ul className="w-full flex items-center gap-10 max-lg:flex-col ">
              <li className="bg-gray-600 overflow-hidden w-full md:w-2/3 lg:w-auto">
                <img
                  src={mockImg}
                  alt="앨범 아트워크"
                  className=" w-full h-full"
                />
              </li>
              <li className="min-w-[45%] flex-grow h-auto flex flex-col max-lg:gap-6 gap-16 items-center justify-center [&_*]:!text-white">
                <span className="text-sm">{albumMeta.year}</span>
                <span className="text-3xl text-center">{albumMeta.title}</span>
                <ol className="flex gap-6">
                  <li>앨범 듣기</li>
                  {!!albumMeta.isCD && <li>CD 구매</li>}
                </ol>
              </li>
            </ul>
          </CarouselItem>
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <Drawer>
              <ul className="w-full h-full flex items-center max-md:justify-center">
                <li className="!pr-10 w-[45%] max-md:w-full h-full flex flex-col gap-6 items-end max-md:items-center justify-center [&_*]:!text-white overflow-y-scroll">
                  <span className="text-sm">{albumMeta.year}</span>
                  <span className="text-2xl ">{albumMeta.title}</span>
                  <DrawerTrigger
                    onClick={() => setSelectedTrack(null)}
                    className={cx(
                      "cursor-pointer !px-2 relative",
                      minLaptop &&
                        !selectedTrack &&
                        "!bg-white/75 [&_>span]:!text-black"
                    )}
                  >
                    <span>앨범 소개</span>
                    <div
                      className={cx(
                        minLaptop &&
                          !selectedTrack &&
                          "absolute w-10 h-full bg-white/75 top-0 -right-10 z-[50]"
                      )}
                    />
                  </DrawerTrigger>
                  <ol className="w-full flex flex-col gap-2 text-right max-md:text-center [&_>li]:!w-full [&_>li]:break-all">
                    {_.map(albumMeta.tracks, (tr, i) => (
                      <li key={tr.trackNo}>
                        {tr.lyrics ? (
                          <DrawerTrigger
                            onClick={() => setSelectedTrack(tr)}
                            className={cx(
                              "cursor-pointer !px-2 relative max-md:text-center text-right",
                              minLaptop &&
                                selectedTrack?.trackNo === i + 1 &&
                                "!bg-white/75 [&_>span]:!text-black"
                            )}
                          >
                            <span>
                              {tr.trackNo}. {tr.title}
                            </span>
                            <div
                              className={cx(
                                minLaptop &&
                                  selectedTrack?.trackNo === i + 1 &&
                                  "absolute w-10 h-full bg-white/75 top-0 -right-10 z-[50]"
                              )}
                            />
                          </DrawerTrigger>
                        ) : (
                          <span>
                            {tr.trackNo}. {tr.title}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </li>
                {minLaptop ? (
                  <li className="w-[55%] max-h-[85%] bg-white/75 !p-10 shadow-xl overflow-scroll flex-grow">
                    {/* TODO: 여기도 DOMpurify 넣기 */}
                    <div className="whitespace-break-spaces">
                      {selectedTrack ? (
                        selectedTrack.lyrics
                      ) : (
                        <>
                          <p className="!mb-6 whitespace-break-spaces">
                            {albumMeta.description}
                          </p>
                          <hr className="!my-4 border-black/20" />
                          <p className="text-xs opacity-80 whitespace-break-spaces">
                            {albumMeta.credits}
                          </p>
                        </>
                      )}
                    </div>
                  </li>
                ) : (
                  <DrawerContent className="flex flex-col items-center !py-6 !bg-black/90 w-full h-[90dvh]">
                    <DrawerHeader className="w-full h-[90%] text-center !py-6">
                      <DrawerTitle className="!text-white !pb-6">
                        {selectedTrack
                          ? selectedTrack.title
                          : "앨범 소개와 크레딧"}
                      </DrawerTitle>
                      <DrawerDescription className="w-full h-full !text-white whitespace-break-spaces !overflow-y-scroll">
                        {selectedTrack ? (
                          selectedTrack.lyrics
                        ) : (
                          <>
                            <div className="!mb-6 !text-white whitespace-break-spaces">
                              {albumMeta.description}
                            </div>
                            <hr className="!my-4 border-white/20" />
                            <div className="text-xs opacity-80 !text-white whitespace-break-spaces">
                              {albumMeta.credits}
                            </div>
                          </>
                        )}
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="h-[10%]">
                      <DrawerClose asChild>
                        <X size={28} color="#fff" />
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                )}
              </ul>
            </Drawer>
          </CarouselItem>
        </CarouselContent>

        <ChevronLeft
          size={40}
          color="#fff"
          onClick={() => carouselRef.current?.scrollPrev()}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none absolute rounded-full top-1/2 -left-3 md:-left-6 lg:-left-12 -translate-y-1/2 cursor-pointer bg-transparent "
        />
        <ChevronRight
          size={40}
          color="#fff"
          onClick={() => carouselRef.current?.scrollNext()}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none  absolute rounded-full top-1/2 -right-3 md:-right-6 lg:-right-12 -translate-y-1/2 cursor-pointer bg-transparent"
        />
      </Carousel>
    </>
  );
};

const OthersCarousel = () => {
  const carouselRef = useRef<CarouselApi | null>(null);
  return (
    <>
      <Carousel
        setApi={(api) => (carouselRef.current = api)}
        opts={{ loop: true, watchDrag: true }}
        className="w-full h-full relative !px-10 lg:!px-20"
      >
        <CarouselContent className="w-full h-[calc(100dvh-8rem)]">
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <ul className="w-full flex items-center gap-10 max-lg:flex-col">
              <li className="w-full md:w-2/3 lg:w-auto bg-gray-600 overflow-hidden ">
                <img
                  src={mockImg}
                  alt="앨범 아트워크"
                  className="w-full h-full"
                />
              </li>
              <li className="min-w-[45%] flex-grow h-auto flex flex-col gap-6 items-center justify-center [&_*]:!text-white">
                <span className="text-sm">2021 ~</span>
                <span className="text-3xl text-center">EPs & SINGLEs</span>
              </li>
            </ul>
          </CarouselItem>
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <ul className="w-full h-full flex gap-10 items-center">
              <li className="w-2/3 h-auto flex flex-col gap-10 items-center justify-start">
                <div className="max-w-1/2  bg-gray-600 overflow-hidden ">
                  <img
                    src={mockImg}
                    alt="앨범 아트워크"
                    className="w-full h-full"
                  />
                </div>
                <ul className="flex gap-10 w-full justify-between items-start [&_*]:!text-white">
                  <li className="w-1/2 h-full flex flex-col items-end justify-center gap-6 ">
                    <span className="text-sm">2021</span>
                    <span className="text-2xl ">앨범 타이틀</span>
                    <span>노래 듣기</span>
                  </li>
                  <li className="w-1/2 flex flex-col justify-start items-start gap-2">
                    <span className="">소개</span>
                    <ol className="w-1/2 flex flex-col gap-2 [&_>li]:w-full [&_>li]:break-all">
                      <li>1. 트랙리스트</li>
                      <li>2. 트랙리스트</li>
                      <li>3. 트랙리스트</li>
                      <li>4. 트랙리스트</li>
                      <li>5. 트랙리스트</li>
                    </ol>
                  </li>
                </ul>
              </li>
              <li className="w-full md:w-2/3 max-h-[85%] bg-white overflow-scroll !p-10 shadow-xl">
                {/* TODO: 여기도 DOMpurify 넣기 */}
                <p>
                  앨범 소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글... 소개글...앨범 소개글... 소개글...앨범
                  소개글... 소개글...앨범 소개글... 소개글...앨범 소개글...
                  소개글...앨범 소개글... 소개글...앨범 소개글... 소개글...앨범
                  소개글...소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                  소개글...앨범 소개글...앨범 소개글... 소개글...앨범 소개글...
                  소개글...앨범 소개글...
                </p>
              </li>
            </ul>
          </CarouselItem>
        </CarouselContent>
        <ChevronLeft
          size={40}
          color="#fff"
          onClick={() => carouselRef.current?.scrollPrev()}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none absolute rounded-full top-1/2 -left-3 md:-left-6 lg:-left-12 -translate-y-1/2 cursor-pointer bg-transparent "
        />
        <ChevronRight
          size={40}
          color="#fff"
          onClick={() => carouselRef.current?.scrollNext()}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none  absolute rounded-full top-1/2 -right-3 md:-right-6 lg:-right-12 -translate-y-1/2 cursor-pointer bg-transparent"
        />
      </Carousel>
    </>
  );
};

const OSTCarousel = () => {
  const carouselRef = useRef<CarouselApi | null>(null);
  return (
    <>
      <Carousel
        setApi={(api) => (carouselRef.current = api)}
        opts={{ loop: true, watchDrag: true }}
        className="w-full h-full relative !px-10 lg:!px-20"
      >
        <CarouselContent className="w-full h-[calc(100dvh-8rem)]">
          <CarouselItem className=" w-full h-full flex items-center justify-center">
            <ul className="w-full flex items-center gap-10 max-lg:flex-col">
              <li className="w-full md:w-2/3 lg:w-auto bg-gray-600 overflow-hidden">
                <img
                  src={mockImg}
                  alt="앨범 아트워크"
                  className="w-full h-full"
                />
              </li>
              <li className="min-w-[45%] flex-grow h-auto flex flex-col gap-6 items-center justify-center [&_*]:!text-white">
                <span className="text-sm">2024 ~</span>
                <span className="text-3xl text-center">
                  ORIGINAL SOUNDTRACKs
                </span>
              </li>
            </ul>
          </CarouselItem>
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <ul className=" w-full h-full flex gap-10 items-center ">
              <li className="w-2/3 h-auto flex flex-col gap-10 items-center justify-start ">
                <div className="max-w-1/2  bg-gray-600 overflow-hidden ">
                  <img
                    src={mockImg}
                    alt="앨범 아트워크"
                    className="w-full h-full"
                  />
                </div>
                <ul className="flex gap-10 w-full justify-between items-center [&_*]:!text-white ">
                  <li className=" w-full h-full flex flex-col items-center justify-center gap-6 ">
                    <span className="text-sm">2024</span>
                    <span className="text-2xl ">앨범 타이틀</span>
                    <span>노래 듣기</span>
                  </li>
                </ul>
              </li>
              <li className="w-1/3 flex flex-col max-h-[85%] overflow-scroll  justify-start items-start gap-2 ">
                <ol className="w-full flex flex-col [&_>li]:w-full [&_>li]:break-all gap-2 [&_>li]:!text-white">
                  <li>1. 트랙리스트</li>
                  <li>2. 트랙리스트</li>
                  <li>3. 트랙리스트</li>
                  <li>4. 트랙리스트</li>
                  <li>5. 트랙리스트</li>
                  <li>1. 트랙리스트</li>
                  <li>2. 트랙리스트</li>
                  <li>3. 트랙리스트</li>
                  <li>4. 트랙리스트</li>
                  <li>5. 트랙리스트</li>
                  <li>11. 트랙리스트</li>
                </ol>
              </li>
            </ul>
          </CarouselItem>
        </CarouselContent>
        <ChevronLeft
          size={40}
          color="#fff"
          onClick={() => carouselRef.current?.scrollPrev()}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none absolute rounded-full top-1/2 -left-3 md:-left-6 lg:-left-12 -translate-y-1/2 cursor-pointer bg-transparent "
        />
        <ChevronRight
          size={40}
          color="#fff"
          onClick={() => carouselRef.current?.scrollNext()}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none  absolute rounded-full top-1/2 -right-3 md:-right-6 lg:-right-12 -translate-y-1/2 cursor-pointer bg-transparent"
        />
      </Carousel>
    </>
  );
};

const AlbumCarouselLegacy = ({ albumMeta }) => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const minLaptop = useMediaQuery({ minWidth: 768 });
  return (
    <>
      <Carousel
        setApi={(api) => (carouselRef.current = api)}
        opts={{ loop: true, watchDrag: true }}
        className="w-full h-full relative !px-10 lg:!px-20"
      >
        <CarouselContent className="w-full h-[calc(100dvh-8rem)] ">
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <ul className="w-full flex items-center gap-10 max-lg:flex-col ">
              <li className="bg-gray-600 overflow-hidden w-full md:w-2/3 lg:w-auto">
                <img
                  src={mockImg}
                  alt="앨범 아트워크"
                  className=" w-full h-full"
                />
              </li>
              <li className="min-w-[45%] flex-grow h-auto flex flex-col max-lg:gap-6 gap-16 items-center justify-center [&_*]:!text-white">
                <span className="text-sm">{albumMeta.year}</span>
                <span className="text-3xl text-center">{albumMeta.title}</span>
                <ol className="flex gap-6">
                  <li>앨범 듣기</li>
                  {!!albumMeta.isCD && <li>CD 구매</li>}
                </ol>
              </li>
            </ul>
          </CarouselItem>
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <ul className=" w-full h-full flex gap-10 items-center max-md:justify-center">
              <li className="w-[35%] h-full flex flex-col gap-6 items-end max-md:items-center justify-center [&_*]:!text-white overflow-scroll">
                <span className="text-sm">{albumMeta.year}</span>
                <span className="text-2xl ">{albumMeta.title}</span>
                <span>앨범 소개</span>
                <ol className="w-full flex flex-col gap-2 text-right max-md:text-center [&_>li]:w-full [&_>li]:break-all">
                  {_.map(albumMeta.tracks, (tr) => (
                    <li>
                      {tr.trackNo}. {tr.title}
                    </li>
                  ))}
                </ol>
              </li>
              {minLaptop && (
                <li className="w-[65%] max-h-[85%] bg-white/75 !p-10 shadow-xl overflow-scroll flex-grow">
                  {/* TODO: 여기도 DOMpurify 넣기 */}
                  <p>
                    앨범 소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글... 소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글...소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글...소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글...소개글...앨범 소개글... 소개글...앨범
                    소개글... 소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글...소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글... 소개글...앨범 소개글...
                    소개글...앨범 소개글...
                  </p>
                </li>
              )}
            </ul>
          </CarouselItem>
        </CarouselContent>

        <ChevronLeft
          size={40}
          color="#fff"
          onClick={() => carouselRef.current?.scrollPrev()}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none absolute rounded-full top-1/2 -left-3 md:-left-6 lg:-left-12 -translate-y-1/2 cursor-pointer bg-transparent "
        />
        <ChevronRight
          size={40}
          color="#fff"
          onClick={() => carouselRef.current?.scrollNext()}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none  absolute rounded-full top-1/2 -right-3 md:-right-6 lg:-right-12 -translate-y-1/2 cursor-pointer bg-transparent"
        />
      </Carousel>
    </>
  );
};
