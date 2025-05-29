import mockImg from "@/assets/images/rainlight.jpg";
import mockImg2 from "@/assets/images/gimbap.jpg";
import _ from "lodash";
import DOMPurify from "dompurify";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCallback, useRef } from "react";

const newsMockData = [
  {
    idx: 0,
    date: 1742482800000,
    img: mockImg,
    title: "Rainlight 언플러그드 라운지",
    content: `흐린 날, 조용히 번지는 빛과 소리.
비 오는 날의 창가처럼 고요하고 차분한 시간.
말을 아끼는 멜로디와 단순한 울림.
그리고 오래된 기억을 떠올리게 하는 순간들.
<br/>
With
HIMINN (@himinn___)
기쿠하시 (@0primetime)
<br/>
* 공연정보
- 일시: 2025년 4월 3일(목) 오후 8시
- 장소: 언플러그드 라운지 (구 언플러그드 서교점, 서울 마포구 와우산로29길 15 2층)
- 티켓: 사전예매 25,000원 / 현장예매 30,000원 (50석)
(음료 20% 할인 포함) 입장번호순 좌석제 공연
- 예매오픈: 3월 22일 토요일 오후 5시
- 예매마감: 4월 2일 수요일 오후 5시
<br/>
* 티켓 예매 방법
1. 언플러그드 라운지 프로필 링크트리 접속
(https://linktr.ee/unplugged_lounge)
2. 04-03(목) PM 8:00 / [Rainlight - HIMINN, 기쿠하시] 클릭
3. 구글폼 작성 및 제출
4. 입금
5. 예매 확정 안내 문자 수신
<br/>
* 자세한 사항은 구글폼을 참고해주세요
* 공연 관련 문의 : 인스타그램 @nnoots_ DM`,
  },
  {
    idx: 1,
    date: 1622482800000,
    img: mockImg2,
    title: "다큐멘터리 [김밥의 천국]",
    content: `세계 최초의 김밥 다큐멘터리, MBC 경남 [김밥의 천국]에 음악감독으로 참여했습니다. 두 번이나 좋은 기회를 받았네요.
<br/>
‘전국 5만 개에 이르는 김밥집 가운데 엄선한 맛집과 김밥 한 줄에 담긴 한국의 근현대사를 조명한다’고 합니다.
<br/>
총 2부작으로, 11월 28일(목)과 12월 5일(목) 밤 9시에 각각 1부와 2부로 나뉘어 방영됩니다.
<br/>
MBC경남 TV와 공식 유튜브 채널 ‘엠키타카’ 라이브를 통해 시청하실 수 있습니다.
<br/>
두 유 노 K-Kimbap?
<br/>
* credit *
<br/>
- 마스터링 : @studio_pho.ne`,
  },
  {
    idx: 2,
    date: +new Date(),
    img: mockImg,
    title: "Rainlight 언플러그드 라운지",
    content: `흐린 날, 조용히 번지는 빛과 소리.
비 오는 날의 창가처럼 고요하고 차분한 시간.
말을 아끼는 멜로디와 단순한 울림.
그리고 오래된 기억을 떠올리게 하는 순간들.
<br/>
With
HIMINN (@himinn___)
기쿠하시 (@0primetime)
<br/>
* 공연정보
- 일시: 2025년 4월 3일(목) 오후 8시
- 장소: 언플러그드 라운지 (구 언플러그드 서교점, 서울 마포구 와우산로29길 15 2층)
- 티켓: 사전예매 25,000원 / 현장예매 30,000원 (50석)
(음료 20% 할인 포함) 입장번호순 좌석제 공연
- 예매오픈: 3월 22일 토요일 오후 5시
- 예매마감: 4월 2일 수요일 오후 5시
<br/>
* 티켓 예매 방법
1. 언플러그드 라운지 프로필 링크트리 접속
(https://linktr.ee/unplugged_lounge)
2. 04-03(목) PM 8:00 / [Rainlight - HIMINN, 기쿠하시] 클릭
3. 구글폼 작성 및 제출
4. 입금
5. 예매 확정 안내 문자 수신
<br/>
* 자세한 사항은 구글폼을 참고해주세요
* 공연 관련 문의 : 인스타그램 @nnoots_ DM`,
  },
  {
    idx: 3,
    date: 1622482800000,
    img: mockImg2,
    title: "다큐멘터리 [김밥의 천국]",
    content: `세계 최초의 김밥 다큐멘터리, MBC 경남 [김밥의 천국]에 음악감독으로 참여했습니다. 두 번이나 좋은 기회를 받았네요.
<br/>
‘전국 5만 개에 이르는 김밥집 가운데 엄선한 맛집과 김밥 한 줄에 담긴 한국의 근현대사를 조명한다’고 합니다.
<br/>
총 2부작으로, 11월 28일(목)과 12월 5일(목) 밤 9시에 각각 1부와 2부로 나뉘어 방영됩니다.
<br/>
MBC경남 TV와 공식 유튜브 채널 ‘엠키타카’ 라이브를 통해 시청하실 수 있습니다.
<br/>
두 유 노 K-Kimbap?
<br/>
* credit *
<br/>
- 마스터링 : @studio_pho.ne`,
  },
  {
    idx: 4,
    date: +new Date(),
    img: mockImg,
    title: "Rainlight 언플러그드 라운지",
    content: `흐린 날, 조용히 번지는 빛과 소리.
비 오는 날의 창가처럼 고요하고 차분한 시간.
말을 아끼는 멜로디와 단순한 울림.
그리고 오래된 기억을 떠올리게 하는 순간들.
<br/>
With
HIMINN (@himinn___)
기쿠하시 (@0primetime)
<br/>
* 공연정보
- 일시: 2025년 4월 3일(목) 오후 8시
- 장소: 언플러그드 라운지 (구 언플러그드 서교점, 서울 마포구 와우산로29길 15 2층)
- 티켓: 사전예매 25,000원 / 현장예매 30,000원 (50석)
(음료 20% 할인 포함) 입장번호순 좌석제 공연
- 예매오픈: 3월 22일 토요일 오후 5시
- 예매마감: 4월 2일 수요일 오후 5시
<br/>
* 티켓 예매 방법
1. 언플러그드 라운지 프로필 링크트리 접속
(https://linktr.ee/unplugged_lounge)
2. 04-03(목) PM 8:00 / [Rainlight - HIMINN, 기쿠하시] 클릭
3. 구글폼 작성 및 제출
4. 입금
5. 예매 확정 안내 문자 수신
<br/>
* 자세한 사항은 구글폼을 참고해주세요
* 공연 관련 문의 : 인스타그램 @nnoots_ DM`,
  },
  {
    idx: 5,
    date: 1622482800000,
    img: mockImg2,
    title: "다큐멘터리 [김밥의 천국]",
    content: `세계 최초의 김밥 다큐멘터리, MBC 경남 [김밥의 천국]에 음악감독으로 참여했습니다. 두 번이나 좋은 기회를 받았네요.
<br/>
‘전국 5만 개에 이르는 김밥집 가운데 엄선한 맛집과 김밥 한 줄에 담긴 한국의 근현대사를 조명한다’고 합니다.
<br/>
총 2부작으로, 11월 28일(목)과 12월 5일(목) 밤 9시에 각각 1부와 2부로 나뉘어 방영됩니다.
<br/>
MBC경남 TV와 공식 유튜브 채널 ‘엠키타카’ 라이브를 통해 시청하실 수 있습니다.
<br/>
두 유 노 K-Kimbap?
<br/>
* credit *
<br/>
- 마스터링 : @studio_pho.ne`,
  },
];

const formatLocalTimetoDate = (millis: number): string => {
  const date = new Date(millis);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export default function News() {
  const AccordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
    AccordionRefs.current[index] = el;
  }, []);

  const scrollToItem = (i: number): void => {
    const ref = AccordionRefs.current[i];
    if (ref) {
      const offset = 168;
      const y = ref.getBoundingClientRect().top + window.scrollY - offset;

      setTimeout(() => {
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }, 50);
    }
  };

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-scroll !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full flex flex-col !pt-10 items-start justify-between ">
        <Accordion type="single" collapsible className="max-w-full w-full">
          {_.map(newsMockData, (news, i) => {
            const sanitizeContent = DOMPurify.sanitize(news?.content ?? "");
            return (
              <AccordionItem
                ref={(el) => setRef(el, i)}
                key={news.idx}
                value={`${news.idx}`}
                className="!pb-10 w-full"
              >
                <AccordionTrigger
                  onClick={() => scrollToItem(i)}
                  className="w-full !-mt-0.5 [&>svg]:hidden group hover:shadow-md"
                >
                  <div
                    className="!bg-[length:105%] bg-center bg-no-repeat group-hover:!bg-[length:100%] w-full h-72 flex items-end justify-start cursor-pointer transition-all hover:opacity-90 duration-200 hover:[&_>span]:opacity-100"
                    style={{
                      backgroundImage: `url(${news.img})`,
                    }}
                  >
                    <span className=" !text-white text-xl bg-[#000] opacity-80 border-l-2 border-[#666] !p-3 !m-3 duration-200">
                      {news.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="!p-6 !z-10 flex flex-col gap-6 bg-white">
                  <p
                    className="w-full whitespace-pre-wrap "
                    dangerouslySetInnerHTML={{ __html: sanitizeContent }}
                  />
                  <span className="text-right font-semibold">
                    {formatLocalTimetoDate(+news.date)}
                  </span>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
