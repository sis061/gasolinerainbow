import YouTube from "react-youtube";

import BandcampLogo from "@/assets/logos/bandcamp.svg?react";
import ApplemusicLogo from "@/assets/logos/applemusic.svg?react";
import SpotifyLogo from "@/assets/logos/spotify.svg?react";
import YoutubeMusicLogo from "@/assets/logos/youtubemusic.svg?react";
import BugsLogo from "@/assets/logos/Bugs_BI_wordmark_white.svg?react";
import MelonLogo from "@/assets/logos/melonLogo.svg?react";
// import FloLogo from "@/assets/logos/flo.svg?react";
import GeniemusicLogo from "@/assets/logos/genie_BI_logotype_white.svg?react";
import { Button } from "@/components/ui/button";
import _ from "lodash";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScaleLoader } from "react-spinners";
import HMimg from "@/assets/images/HM.jpg";

const streamingPlatforms = [
  {
    label: "밴드캠프",
    color: "#09a2c8",
    Component: BandcampLogo,
  },
  {
    label: "스포티파이",
    color: "#1DB954",
    Component: SpotifyLogo,
  },
  {
    label: "유튜브 뮤직",
    color: "#CD201F",
    Component: YoutubeMusicLogo,
  },
  {
    label: "애플 뮤직",
    color: "#FA586A",
    Component: ApplemusicLogo,
  },
  {
    label: "멜론",
    color: "#00cd3c",
    Component: MelonLogo,
  },
  {
    label: "벅스",
    color: "#FF3B28",
    Component: BugsLogo,
  },
  {
    label: "지니뮤직",
    color: "#0096FF",
    Component: GeniemusicLogo,
  },
  // {
  //   label: "FLO",
  //   color: "#0096FF",
  //   Component: FloLogo,
  // },
];

export default function Home() {
  // const today: number = +new Date();
  //TODO : 발매 날짜 정해지면 발매 전에는 타이머, 발매 후에는 앨범 소개 페이지로 전환 기능 추가
  const isReleased: boolean = false;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const minTablet = useMediaQuery({ minWidth: 768 });

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full h-full !mb-10 md:!pt-10 max-md:!px-4">
        {!isReleased ? (
          <>
            <div className="grid grid-rows-1 lg:grid-rows-2 grid-cols-4 w-full h-full gap-2">
              {/* TODO: 앨범 소개 컴포넌트 구분해서 만들기 */}
              <div className="w-auto shadow-2xl row-start-2 col-start-1 col-span-4 bg-white/75 flex flex-col justify-between gap-10 !-mt-4 lg:!-mt-18 lg:!mr-12 !p-6 ">
                <h1 className="text-lg font-bold !p-2">
                  앨범 <span className="text-4xl">[ HM ]</span>
                </h1>
                <p className="w-full whitespace-break-spaces">
                  저에게 제 노래는 일종의 방어입니다. 자신을 바라보고 제 속의
                  갈등—주로 고독 및 자기 비난—을 다시 곱게 빚어내는 자기 방어.
                  <br />
                  <br />
                  그러니 제가 저를 직접 내보이기는 아직도 부끄럽기에, 이번에는
                  마치 셀프 타이틀 같지 않은 셀프 타이틀 앨범 [HM]에 열한 곡의
                  노래들을 엮었습니다.
                  <br />
                  <br />
                  언제는 외로움에 어찌할 바를 모르다가도 또 가끔은 초연해지는,
                  저 그리고 모두가 가진 본연의 모습을 담고 싶었습니다.
                </p>
                <div className="flex flex-col gap-6 w-full">
                  <div
                    className="flex items-center gap-1 max-md:hover:underline max-md:hover:cursor-pointer select-none"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <h2 className="font-bold !pl-1">아래에서 듣기</h2>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        !minTablet && isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${minTablet || isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="pt-2">
                      <StreamingPlatformButtons />
                    </div>
                  </div>
                </div>
              </div>
              <div className="!aspect-video lg:!ml-3 row-start-1 overflow-hidden lg:col-start-2 col-span-4 lg:col-span-3 bg-black w-full h-full [&_>div]:h-full shadow-xl">
                <HMYoutubeEmbed />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-1/4">여기에 타이머</div>
          </>
        )}
      </div>
    </section>
  );
}

const HMYoutubeEmbed = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  return (
    <>
      {!isReady && (
        <div
          style={{ backgroundImage: `url(${HMimg})` }}
          className={`w-full h-full flex items-center justify-center bg-contain bg-no-repeat bg-center opacity-50`}
        >
          <ScaleLoader barCount={5} color="#666" margin={5} />
        </div>
      )}
      <YouTube
        videoId="q0RXd1Tj7tk"
        loading="eager"
        onReady={() => setIsReady(true)}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0, //자동재생 O
            rel: 0, //관련 동영상 표시하지 않음
            modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
          },
        }}
      />
    </>
  );
};

const StreamingPlatformButtons = () => (
  <ul className="flex flex-wrap gap-3 max-md:flex-col [@media(max-width:1239px)]:w-[73%] max-md:!w-full">
    {_.map(streamingPlatforms, ({ label, color, Component }) => (
      <li key={label}>
        <Button
          variant="default"
          style={{ backgroundColor: color }}
          className={`min-w-fit max-md:w-full !px-3 !py-2 hover:opacity-75 cursor-pointer`}
        >
          <Component fill="#fff" />
          <span className="!text-white text-sm">{label}</span>
        </Button>
      </li>
    ))}
  </ul>
);
