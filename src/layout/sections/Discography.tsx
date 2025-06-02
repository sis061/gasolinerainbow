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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { useInView } from "react-intersection-observer";

import { mockDiskData } from "@/layout/sections/mockDiskData";
import _ from "lodash";
import cx from "classnames";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import StreamingPlatformButtons, {
  getStreamingPlatformInfo,
} from "@/components/StreamingPlatformButtons";
import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";
import { renderDiskType } from "@/utils/globalHelper";
import useLanguageStore from "@/store/useLanguageStore";

//TODO: Mockdata 넣은거 나중에 데이터 넣은 후 타입 지정 제대로 하기.

export default function Discography() {
  const { guideButton, setGuideButton } = useDiscographyGuideStore();
  const othersData = _.filter(
    mockDiskData,
    (data) => data.type !== "album" && data.type !== "ost"
  );
  const ostData = _.filter(mockDiskData, (data) => data.type === "ost");

  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);

  useEffect(() => {
    if (guideButton !== isInfoVisible) {
      setGuideButton(isInfoVisible);
    }
  }, [guideButton, isInfoVisible]);

  return (
    <section className="wrapper-full w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner-full flex-grow-0 w-full h-full ">
        {/* 정규 앨범 컴포넌트 형식 */}
        <AlbumCarousel
          albumMeta={mockDiskData[0]}
          onChange={setIsInfoVisible}
        />
        {/* EP Single, OST 컴포넌트 형식 */}
        <OthersCarousel albumMetas={othersData} onChange={setIsInfoVisible} />
        <OSTCarousel albumMetas={ostData} onChange={setIsInfoVisible} />
      </div>
    </section>
  );
}

const AlbumCarousel = ({ albumMeta, onChange }) => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const lyricsRef = useRef<HTMLLIElement | null>(null);
  const minLaptop = useMediaQuery({ minWidth: 768 });
  const [selectedTrack, setSelectedTrack] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0.01,
    triggerOnce: false, // true: 최초 한 번만 감지
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
            <ul className="w-full flex items-center gap-10 max-lg:flex-col ">
              <li className="bg-gray-600 overflow-hidden w-full md:w-2/3 lg:w-auto">
                <img
                  src={albumMeta.image}
                  alt="앨범 아트워크"
                  className=" w-full h-full"
                />
              </li>
              <li className="min-w-full lg:min-w-[45%] flex-grow h-auto flex flex-col max-lg:gap-6 gap-16 items-center justify-center [&_*]:!text-white">
                <span className="text-sm">{albumMeta.year}</span>
                <span className="text-3xl md:text-5xl text-center">
                  {albumMeta.title}
                </span>
                <ol className="flex gap-6">
                  <li>
                    <StreamingModal albumMeta={albumMeta} />
                  </li>
                  {!!albumMeta.isCD && (
                    <li className="transition-all duration-200 hover:opacity-50">
                      <Link
                        to={albumMeta.cdUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        CD 구매
                      </Link>
                    </li>
                  )}
                </ol>
              </li>
            </ul>
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
                  <ol className="relative w-full flex flex-col gap-2 text-right max-md:text-center [&_>li]:!w-full [&_>li]:break-all">
                    {_.map(albumMeta.tracks, (tr, i) => (
                      <li key={tr.trackNo}>
                        {tr.lyrics ? (
                          <DrawerTrigger
                            onClick={() => setSelectedTrack(tr)}
                            className={cx(
                              "cursor-pointer !px-2 relative max-md:text-center text-right transition-all duration-200 hover:opacity-50",
                              minLaptop &&
                                selectedTrack?.trackNo === i + 1 &&
                                "!bg-white/75 [&_>span]:!text-black"
                            )}
                          >
                            <span>
                              {tr.trackNo}. {tr.title}
                            </span>
                            {/* <div
                              className={cx(
                                minLaptop &&
                                  selectedTrack?.trackNo === i + 1 &&
                                  "absolute w-10 h-full bg-white/75 top-0 -right-10 z-[50] transition-all duration-200"
                              )}
                            /> */}
                          </DrawerTrigger>
                        ) : (
                          <span className="!px-1.5">
                            {tr.trackNo}. {tr.title}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </li>
                {minLaptop ? (
                  <li
                    ref={lyricsRef}
                    className="w-[55%] max-h-[85%] bg-white/75 !p-10 shadow-xl overflow-scroll flex-grow"
                  >
                    <div className="whitespace-break-spaces transition-all duration-200">
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
                  <DrawerContent
                    aria-describedby={selectedTrack ? "drawer-description" : ""}
                    className="flex flex-col items-center !py-6 !bg-black/90 w-full h-[90dvh]"
                  >
                    <DrawerHeader className="w-full h-[90%] text-center !py-6">
                      <DrawerTitle className="!text-white !pb-6">
                        {selectedTrack
                          ? selectedTrack.title
                          : "앨범 소개와 크레딧"}
                      </DrawerTitle>
                      <div className="w-full h-full !overflow-y-scroll !px-6">
                        {selectedTrack ? (
                          <DrawerDescription className="!text-white whitespace-break-spaces">
                            {selectedTrack.lyrics}
                          </DrawerDescription>
                        ) : (
                          <>
                            <p className="!mb-6 !text-white whitespace-break-spaces text-sm">
                              {albumMeta.description}
                            </p>
                            <hr className="!my-4 border-white/20" />
                            <p className="text-xs opacity-80 !text-white whitespace-break-spaces">
                              {albumMeta.credits}
                            </p>
                          </>
                        )}
                      </div>
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

const OthersCarousel = ({ albumMetas, onChange }) => {
  const carouselRef = useRef<CarouselApi | null>(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

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
              <li className="bg-gray-600 overflow-hidden w-full md:w-2/3 lg:w-auto">
                <img
                  src={albumMetas[0].image}
                  alt="앨범 아트워크"
                  className="w-full h-full"
                />
              </li>
              <li className="min-w-full lg:min-w-[45%] flex-grow h-auto flex flex-col gap-6 items-center justify-center [&_*]:!text-white">
                <span className="text-sm">2021 ~</span>
                <span className="text-3xl md:text-5xl text-center">
                  EPs & SINGLEs
                </span>
              </li>
            </ul>
          </CarouselItem>
          {_.map(albumMetas, (albumMeta, i) => (
            <OthersSlide
              key={i}
              albumMeta={albumMeta}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
              onChange={onChange}
            />
          ))}
        </CarouselContent>
        <ChevronLeft
          size={40}
          color="#fff"
          onClick={() => {
            carouselRef.current?.scrollPrev();
            setTimeout(() => setSelectedTrack(null), 200);
          }}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none absolute rounded-full top-1/2 -left-3 md:-left-6 lg:-left-12 -translate-y-1/2 cursor-pointer bg-transparent "
        />
        <ChevronRight
          size={40}
          color="#fff"
          onClick={() => {
            carouselRef.current?.scrollNext();
            setTimeout(() => setSelectedTrack(null), 200);
          }}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none  absolute rounded-full top-1/2 -right-3 md:-right-6 lg:-right-12 -translate-y-1/2 cursor-pointer bg-transparent"
        />
      </Carousel>
    </>
  );
};

const OSTCarousel = ({ albumMetas, onChange }) => {
  const carouselRef = useRef<CarouselApi | null>(null);

  useEffect(() => {
    onChange(false);
  }, []);

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
              <li className="w-full md:w-2/3 lg:w-auto bg-gray-600 overflow-hidden">
                <img
                  src={albumMetas[0].image}
                  alt="앨범 아트워크"
                  className="w-full h-full"
                />
              </li>
              <li className="min-w-full lg:min-w-[45%] flex-grow h-auto flex flex-col gap-6 items-center justify-center [&_*]:!text-white">
                <span className="text-sm">2024 ~</span>
                <span className="text-3xl md:text-5xl text-center">
                  ORIGINAL SOUNDTRACKs
                </span>
              </li>
            </ul>
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
                      {albumMeta.title}
                    </span>
                    <StreamingModal albumMeta={albumMeta} />
                  </div>
                </li>
                <li className="w-1/3 max-md:w-full max-md:text-center flex flex-col max-h-[85%] overflow-scroll justify-start items-start gap-2">
                  <ol className="w-full flex flex-col [&_>li]:w-full [&_>li]:break-all gap-2 ">
                    {_.map(albumMeta.tracks, (tr) => (
                      <li key={tr.trackNo}>
                        <span className="!text-white">
                          {tr.trackNo}. {tr.title}
                        </span>
                      </li>
                    ))}
                  </ol>
                </li>
              </ul>
            </CarouselItem>
          ))}
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

const OthersSlide = ({
  albumMeta,
  selectedTrack,
  setSelectedTrack,
  onChange,
}) => {
  const lyricsRef = useRef<HTMLLIElement | null>(null);
  const minLaptop = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();
  const type = renderDiskType(albumMeta.type);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false, // true: 최초 한 번만 감지
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
    <CarouselItem className="w-full h-full flex items-center justify-center !px-2.5 md:!px-5">
      <Drawer>
        <ul className="w-full h-full flex items-center max-md:justify-center max-xl:gap-16">
          <li className="w-1/2 max-md:w-full h-full flex flex-col gap-6 items-center justify-center [&_*]:!text-white overflow-y-scroll">
            <div className="w-full xl:w-3/4 bg-gray-600 overflow-hidden ">
              <img
                src={albumMeta.image}
                alt="앨범 아트워크"
                className="w-full h-full"
              />
            </div>
            <ul className="flex max-md:gap-3 max-lg:gap-5 max-xl:gap-7 gap-10 w-full justify-between items-start [&_*]:!text-white ">
              <li className="w-1/2 h-full flex flex-col items-end justify-center gap-2">
                <div className="flex justify-end items-center gap-2 [&_>span]:text-sm">
                  <span>{albumMeta.year}</span>
                  <span>{language === "ko" ? type.kr : type.en}</span>
                </div>
                <span className="text-3xl text-end !pb-4 max-md:text-2xl max-md:font-bold">
                  {albumMeta.title}
                </span>
                <StreamingModal albumMeta={albumMeta} />
              </li>
              <li
                id="trigger-observer"
                ref={ref}
                className="w-1/2 flex flex-col justify-start items-start gap-2 "
              >
                <DrawerTrigger
                  onClick={() => setSelectedTrack(null)}
                  className={cx(
                    "cursor-pointer !px-2 relative w-auto text-left transition-all duration-200 hover:opacity-50",
                    minLaptop &&
                      !selectedTrack &&
                      "!bg-white/75 [&_>span]:!text-black"
                  )}
                >
                  <span>소개</span>
                </DrawerTrigger>
                <ol className="w-full flex flex-col gap-2 [&_>li]:w-full [&_>li]:break-all">
                  {_.map(albumMeta.tracks, (tr, i) => (
                    <li key={tr.trackNo}>
                      {tr.lyrics ? (
                        <DrawerTrigger
                          onClick={() => setSelectedTrack(tr)}
                          className={cx(
                            "cursor-pointer !px-2 relative text-left w-auto transition-all duration-200 hover:opacity-50",
                            minLaptop &&
                              selectedTrack?.trackNo === i + 1 &&
                              "!bg-white/75 [&_>span]:!text-black"
                          )}
                        >
                          <span>
                            {tr.trackNo}. {tr.title}
                          </span>
                        </DrawerTrigger>
                      ) : (
                        <span className="!px-1.5">
                          {tr.trackNo}. {tr.title}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </li>
            </ul>
          </li>
          {minLaptop ? (
            <li
              ref={lyricsRef}
              className="w-1/2 max-h-[85%] bg-white/75 overflow-scroll !p-10 shadow-xl flex-grow"
            >
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
            <DrawerContent
              aria-describedby={
                selectedTrack ? "drawer-description" : undefined
              }
              className="flex flex-col items-center !py-6 !bg-black/90 w-full h-[90dvh]"
            >
              <DrawerHeader className="w-full h-[90%] text-center !py-6">
                <DrawerTitle className="!text-white !pb-6">
                  {selectedTrack ? selectedTrack.title : "소개와 크레딧"}
                </DrawerTitle>
                <div className="w-full h-full !overflow-y-scroll !px-6">
                  {selectedTrack ? (
                    <DrawerDescription className="!text-white whitespace-break-spaces">
                      {selectedTrack.lyrics}
                    </DrawerDescription>
                  ) : (
                    <div id="drawer-description">
                      <p className="!mb-6 !text-white whitespace-break-spaces text-sm">
                        {albumMeta.description}
                      </p>
                      <hr className="!my-4 border-white/20" />
                      <p className="text-xs opacity-80 !text-white whitespace-break-spaces">
                        {albumMeta.credits}
                      </p>
                    </div>
                  )}
                </div>
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
  );
};

const StreamingModal = ({ albumMeta }) => {
  const [open, setOpen] = useState<boolean>(false);
  const minLaptop = useMediaQuery({ minWidth: 768 });
  const platforms = getStreamingPlatformInfo(albumMeta.urls);
  const renderType: string = albumMeta.type === "album" ? "앨범" : "노래";

  if (minLaptop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="transition-all duration-200 hover:opacity-50 cursor-pointer">
          {renderType} 듣기
        </DialogTrigger>
        <DialogContent
          className="flex flex-col items-center !p-10 !bg-black/90 [&_>button>svg]:!stroke-white [&_>button]:cursor-pointer"
          aria-describedby="drawer-description"
        >
          <DialogHeader>
            <DialogTitle className="!text-white !pb-6">
              아래에서 듣기 - {albumMeta.title}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only hidden">
            스트리밍 목록
          </DialogDescription>
          <div className="!overflow-y-scroll w-full h-full">
            <StreamingPlatformButtons
              customClassName={"!flex-col !w-full"}
              platforms={platforms}
              aria-describedby="drawer-description"
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="transition-all duration-200 hover:opacity-50 cursor-pointer">
        {renderType} 듣기
      </DrawerTrigger>
      <DrawerContent
        className="flex flex-col items-center !py-6 !bg-black/90 w-full"
        aria-describedby="drawer-description"
      >
        <DrawerHeader className="w-full h-[90%] text-center !py-6">
          <DrawerTitle className="!text-white !pb-6 sr-only">
            Listen {albumMeta.title}
          </DrawerTitle>

          <div className="w-full h-full !overflow-y-scroll !px-6">
            <StreamingPlatformButtons
              customClassName={"max-md:flex-col max-md:!w-full"}
              platforms={platforms}
              aria-describedby="drawer-description"
            />
          </div>
        </DrawerHeader>
        <DrawerDescription className="sr-only">스트리밍 목록</DrawerDescription>
        <DrawerFooter className="h-[10%]">
          <DrawerClose asChild>
            <X size={28} color="#fff" />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
