import YouTube from "react-youtube";

import BandcampLogo from "@/assets/logos/bandcamp.svg?react";
import ApplemusicLogo from "@/assets/logos/applemusic.svg?react";
import SpotifyLogo from "@/assets/logos/spotify.svg?react";
import YoutubeMusicLogo from "@/assets/logos/youtubemusic.svg?react";
import BugsLogo from "@/assets/logos/Bugs_BI_wordmark_white.svg?react";
import MelonLogo from "@/assets/logos/melonLogo.svg?react";
import { Button } from "@/components/ui/button";

export default function Home() {
  // const today: number = +new Date();
  //TODO : 발매 날짜 정해지면 발매 전에는 타이머, 발매 후에는 앨범 소개 페이지로 전환 기능 추가
  const isReleased: boolean = false;

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full !my-10 !p-6 ">
        {!isReleased ? (
          <>
            <div className="grid grid-rows-2 grid-cols-4 w-full h-full gap-2 ">
              {/* TODO: 앨범 소개 컴포넌트 구분해서 만들기 */}
              <div className="shadow-2xl row-start-2 col-start-1 col-span-4 bg-white flex flex-col justify-between gap-10 !-mt-18 !mr-12 !p-6 ">
                <h1 className="text-lg font-bold !p-2">
                  앨범 <span className="text-4xl">[ HM ]</span>
                </h1>
                {/* TODO: 소개글 elpsis 적용하기 // 전체보기로 할 건지 디스코그라피로 이동시킬건지 고민 */}
                <p className="w-full line-clamp-4 whitespace-break-spaces">
                  저에게 제 노래는 일종의 방어입니다. 자신을 바라보고 제 속의
                  갈등—주로 고독 및 자기 비난—을 다시 곱게 빚어내는 자기 방어.
                  그러니 제가 저를 직접 내보이기는 아직도 부끄럽기에, 이번에는
                  마치 셀프 타이틀 같지 않은 셀프 타이틀 앨범 [HM]에 열한 곡의
                  노래들을 엮었습니다. 언제는 외로움에 어찌할 바를 모르다가도 또
                  가끔은 초연해지는, 저 그리고 모두가 가진 본연의 모습을 담고
                  싶었습니다.
                </p>
                <div className="flex flex-col gap-6">
                  <h2 className="font-bold !pl-1">아래에서 듣기</h2>
                  <ul className="flex gap-3">
                    <li className="">
                      <Button
                        variant="default"
                        className="!p-3 bg-[#0687F5] hover:bg-[#0687F5]/75 cursor-pointer"
                      >
                        <BandcampLogo fill="#fff" />
                        <span className="!text-white">밴드캠프</span>
                      </Button>
                    </li>
                    <li className="">
                      <Button
                        variant="default"
                        className="!p-3 bg-[#81b71a] hover:bg-[#81b71a]/75 cursor-pointer"
                      >
                        <SpotifyLogo fill="#fff" />
                        <span className="!text-white">스포티파이</span>
                      </Button>
                    </li>
                    <li className="">
                      <Button
                        variant="default"
                        className="!p-3 bg-[#CD201F] 75ver:bg-[#CD201F]/75 cursor-pointer"
                      >
                        <YoutubeMusicLogo fill="#fff" />
                        <span className="!text-white">유튜브 뮤직</span>
                      </Button>
                    </li>
                    <li className="">
                      <Button
                        variant="default"
                        className="!p-3 bg-[#f94c57] hover:bg-[#f94c57]/75 cursor-pointer"
                      >
                        <ApplemusicLogo fill="#fff" />
                        <span className="!text-white">애플 뮤직</span>
                      </Button>
                    </li>
                    <li className="">
                      <Button
                        variant="default"
                        className="!p-3 bg-[#03CD3D] hover:bg-[#03CD3D]/75 cursor-pointer"
                      >
                        <MelonLogo fill="#fff" />
                        <span className="!text-white">멜론</span>
                      </Button>
                    </li>
                    <li className="">
                      <Button
                        variant="default"
                        className="!p-3 bg-[#FF3B28] hover:bg-[#FF3B28]/75 cursor-pointer"
                      >
                        <BugsLogo fill="#fff" />
                        <span className="!text-white">벅스</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row-start-1 overflow-hidden col-start-2 col-span-3 bg-black w-full h-full flex items-center justify-center [&_>div]:w-full [&_>div]:h-full shadow-xl">
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
  return (
    <YouTube
      videoId="q0RXd1Tj7tk"
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
  );
};
