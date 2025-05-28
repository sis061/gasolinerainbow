import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Discography() {
  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center border-1">
      <div className="inner flex-grow-0 w-full h-full">
        {/* 정규 앨범 컴포넌트 형식 */}
        <Carousel className="w-full h-full">
          <CarouselContent className="w-full h-[calc(100dvh-8rem)]">
            <CarouselItem className="w-full h-full bg-red-200 flex items-center justify-center">
              <ul className="border-1 w-full flex gap-10 ">
                <li className="w-96 h-96 bg-gray-600 overflow-hidden ">
                  <img src="" alt="앨범 아트워크" className="w-full h-full" />
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
            <CarouselItem className="w-full h-full bg-red-500 flex items-center justify-center">
              <ul className="border-1 w-full h-full flex gap-10 items-center">
                <li className="w-1/3 border-2 max-h-96 h-auto flex flex-col gap-3 items-end justify-start">
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
                <li className="w-2/3 max-h-[85%] bg-gray-600 overflow-scroll flex-grow">
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
              </ul>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* EP Single, OST 컴포넌트 형식 */}
        <Carousel className="w-full h-full">
          <CarouselContent className="w-full h-[calc(100dvh-8rem)]">
            <CarouselItem className="w-full h-full bg-blue-200 flex items-center justify-center">
              <ul className="border-1 w-full flex gap-10 ">
                <li className="w-96 h-96 bg-gray-600 overflow-hidden ">
                  <img src="" alt="앨범 아트워크" className="w-full h-full" />
                </li>
                <li className="border-2 flex-grow h-auto flex flex-col gap-6 items-center justify-center">
                  <span className="text-sm">2021 ~</span>
                  <span className="text-3xl ">EP & SINGLE</span>
                </li>
              </ul>
            </CarouselItem>
            <CarouselItem className="w-full h-full bg-red-500 flex items-center justify-center">
              <ul className="border-1 w-full h-full flex gap-10 items-center">
                <li className="w-1/2 border-2 h-auto flex flex-col gap-3 items-center justify-start">
                  <div className="w-full lg:min-h-90 bg-gray-600 overflow-hidden ">
                    <img src="" alt="앨범 아트워크" className="w-full h-full" />
                  </div>
                  <ul className="flex gap-10 w-full justify-between items-start">
                    <li className="w-1/2 h-full flex flex-col items-end justify-center gap-4">
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
                <li className="w-1/2 max-h-[85%] bg-gray-600 overflow-scroll flex-grow-0">
                  <p>
                    앨범 소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범 .
                    소개글...앨범 소개글...
                  </p>
                </li>
              </ul>
            </CarouselItem>
            <CarouselItem className="w-full h-full bg-amber-500 flex items-center justify-center">
              <ul className="border-1 w-full h-full flex gap-10 items-center">
                <li className="w-1/2 border-2 h-auto flex flex-col gap-3 items-center justify-start">
                  <div className="w-full lg:min-h-90 bg-gray-600 overflow-hidden ">
                    <img src="" alt="앨범 아트워크" className="w-full h-full" />
                  </div>
                  <ul className="flex gap-10 w-full justify-between items-start">
                    <li className="w-1/2 h-full flex flex-col items-end justify-center gap-4">
                      <span className="text-sm">2022</span>
                      <span className="text-2xl ">앨범 타이틀</span>
                      <span>노래 듣기</span>
                    </li>
                    <li className="w-1/2 flex flex-col justify-start items-start gap-3">
                      <span className="">앨범 소개</span>
                      <ol className="flex flex-col">
                        <li>1. 트랙리스트</li>
                      </ol>
                    </li>
                  </ul>
                </li>
                <li className="w-1/2 max-h-[85%] bg-gray-600 overflow-scroll flex-grow-0">
                  <p>
                    앨범 소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범
                    소개글...앨범 소개글...앨범 소개글...앨범 소개글...앨범 .
                    소개글...앨범 소개글...
                  </p>
                </li>
              </ul>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

// 크레딧? 트랙리스트 가사 앨범 소개
