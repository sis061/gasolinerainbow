import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import { ChevronLeft, ChevronRight } from "lucide-react";

import mockImg from "@/assets/images/HM.jpg";
import { useRef } from "react";

export default function Discography() {
  return (
    <section className="wrapper-full w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center ">
      <div className="inner-full flex-grow-0 w-full h-full">
        {/* 정규 앨범 컴포넌트 형식 */}
        <AlbumCarousel />
        {/* EP Single, OST 컴포넌트 형식 */}
        <OthersCarousel />
      </div>
    </section>
  );
}

// 크레딧? 트랙리스트 가사 앨범 소개

const AlbumCarousel = () => {
  const carouselRef = useRef<CarouselApi | null>(null);
  return (
    <>
      <Carousel
        setApi={(api) => (carouselRef.current = api)}
        opts={{ loop: true, watchDrag: true }}
        className="w-full h-full !px-20 relative"
      >
        <CarouselContent className="w-full h-[calc(100dvh-8rem)]">
          <CarouselItem className="w-full h-full  flex items-center justify-center">
            <ul className=" w-full flex gap-10 ">
              <li className="min-w-1/2 bg-gray-600 overflow-hidden ">
                <img
                  src={mockImg}
                  alt="앨범 아트워크"
                  className="w-full h-full"
                />
              </li>
              <li className="border-2 flex-grow h-auto flex flex-col gap-16 items-center justify-center">
                <span className="text-sm">2022</span>
                <span className="text-3xl ">앨범 타이틀</span>
                <ol className="flex gap-6">
                  <li>앨범 듣기</li>
                  <li>CD 구매</li>
                </ol>
              </li>
            </ul>
          </CarouselItem>
          <CarouselItem className="w-full h-full  flex items-center justify-center">
            <ul className=" w-full h-full flex gap-10 items-center">
              <li className="w-1/3 max-h-96 h-auto flex flex-col gap-3 items-end justify-start">
                <span className="text-sm">2022</span>
                <span className="text-2xl ">앨범 타이틀</span>
                <span className="">앨범 소개</span>
                <ol className="flex flex-col">
                  <li>1. 트랙리스트</li>
                  <li>2. 트랙리스트</li>
                  <li>3. 트랙리스트</li>
                  <li>4. 트랙리스트</li>
                  <li>5. 트랙리스트</li>
                  <li>6. 트랙리스트</li>
                  <li>7. 트랙리스트</li>
                  <li>8. 트랙리스트</li>
                  <li>9. 트랙리스트</li>
                  <li>10. 트랙리스트</li>
                  <li>11. 트랙리스트</li>
                </ol>
              </li>
              <li className="w-2/3 max-h-[85%] bg-white !p-10 shadow-xl overflow-scroll flex-grow">
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
                  소개글...앨범 소개글... 소개글...앨범 소개글... 소개글...앨범
                  소개글... 소개글...앨범 소개글... 소개글...앨범 소개글...
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
                  소개글...앨범 소개글... 소개글...앨범 소개글... 소개글...앨범
                  소개글... 소개글...앨범 소개글... 소개글...앨범 소개글...
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
                  소개글...앨범 소개글... 소개글...앨범 소개글... 소개글...앨범
                  소개글... 소개글...앨범 소개글... 소개글...앨범
                  소개글...소개글...앨범 소개글... 소개글...앨범 소개글...
                  소개글...앨범 소개글... 소개글...앨범 소개글... 소개글...앨범
                  소개글... 소개글...앨범 소개글... 소개글...앨범
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
                  소개글...앨범 소개글... 소개글...앨범 소개글... 소개글...앨범
                  소개글... 소개글...앨범 소개글... 소개글...앨범 소개글...
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
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none absolute rounded-full top-1/2 -left-12 -translate-y-1/2 cursor-pointer bg-transparent "
        />
        <ChevronRight
          size={40}
          color="#fff"
          onClick={() => carouselRef.current?.scrollNext()}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none  absolute rounded-full top-1/2 -right-12 -translate-y-1/2 cursor-pointer bg-transparent"
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
        className="w-full h-full !px-20 relative"
      >
        <CarouselContent className="w-full h-[calc(100dvh-8rem)]">
          <CarouselItem className="w-full h-full  flex items-center justify-center">
            <ul className=" w-full flex gap-10 ">
              <li className="min-w-1/2 bg-gray-600 overflow-hidden ">
                <img
                  src={mockImg}
                  alt="앨범 아트워크"
                  className="w-full h-full"
                />
              </li>
              <li className="border-2 flex-grow h-auto flex flex-col gap-6 items-center justify-center">
                <span className="text-sm">2021 ~</span>
                <span className="text-3xl ">EP & SINGLE</span>
              </li>
            </ul>
          </CarouselItem>
          <CarouselItem className="w-full h-full flex items-center justify-center">
            <ul className=" w-full h-full flex gap-10 items-center">
              <li className="w-1/2 h-auto flex flex-col gap-10 items-center justify-start">
                <div className="max-w-1/2  bg-gray-600 overflow-hidden ">
                  <img
                    src={mockImg}
                    alt="앨범 아트워크"
                    className="w-full h-full"
                  />
                </div>
                <ul className="flex gap-10 w-full justify-between items-start">
                  <li className="w-1/2 h-full flex flex-col items-end justify-center gap-6">
                    <span className="text-sm">2021</span>
                    <span className="text-2xl ">앨범 타이틀</span>
                    <span>노래 듣기</span>
                  </li>
                  <li className="w-1/2 flex flex-col justify-start items-start gap-3">
                    <span className="">소개</span>
                    <ol className="flex flex-col">
                      <li>1. 트랙리스트</li>
                      <li>2. 트랙리스트</li>
                      <li>3. 트랙리스트</li>
                      <li>4. 트랙리스트</li>
                      <li>5. 트랙리스트</li>
                    </ol>
                  </li>
                </ul>
              </li>
              <li className="w-2/3 max-h-[85%] bg-white overflow-scroll flex-grow !p-10 shadow-xl">
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
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none absolute rounded-full top-1/2 -left-12 -translate-y-1/2 cursor-pointer bg-transparent "
        />
        <ChevronRight
          size={40}
          color="#fff"
          onClick={() => carouselRef.current?.scrollNext()}
          className="transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none  absolute rounded-full top-1/2 -right-12 -translate-y-1/2 cursor-pointer bg-transparent"
        />
      </Carousel>
    </>
  );
};
