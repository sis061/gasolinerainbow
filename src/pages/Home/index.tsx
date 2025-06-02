import YouTube from "react-youtube";

import _ from "lodash";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScaleLoader } from "react-spinners";

import StreamingPlatformButtons, {
  getStreamingPlatformInfo,
} from "@/components/StreamingPlatformButtons";

import Countdown from "react-countdown";
import { renderDiskType } from "@/utils/globalHelper";
import useLanguageStore from "@/store/useLanguageStore";
import cx from "classnames";
import { mockDiskData } from "@/utils/mockDiskData";
import type { Disk } from "@/types/discography";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
  const { language } = useLanguageStore();
  const releaseDate = new Date("2025-07-03T12:00:00");

  const [HMData] = _.filter(
    mockDiskData,
    (data) => data.title.toLowerCase() === "Hm".toLowerCase()
  );

  // Renderer callback with condition
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return <HomeAlbumOverview albumMeta={HMData} />;
    } else {
      const renderDate = [
        {
          count: days,
          kr: "일",
          en: "Days",
        },
        {
          count: hours,
          kr: "시간",
          en: "Hours",
        },
        {
          count: minutes,
          kr: "분",
          en: "Minutes",
        },
        {
          count: seconds,
          kr: "초",
          en: "Seconds",
        },
      ];
      return (
        <div className="min-h-[calc(100dvh-8rem)] md:!-mt-16 max-md:!-px-4 w-full flex items-center justify-center">
          {_.map(renderDate, (d) => {
            if (d.en === "Days" && d.count <= 0) return;
            return (
              <div
                key={d.en}
                className={cx(
                  "flex w-full items-center justify-center",
                  language === "ko"
                    ? "flex-row items-end max-md:flex-col max-md:items-center"
                    : "flex-col "
                )}
              >
                <span className="text-5xl md:text-6xl lg:text-7xl !text-center font-bold tabular-nums">
                  {pad(d.count)}
                </span>
                <span
                  className={cx(
                    "text-center opacity-75",
                    language === "ko"
                      ? "text-md md:text-lg lg:text-xl !pl-1.5"
                      : "text-sm md:text-md lg:text-lg"
                  )}
                >
                  {language === "ko" ? d.kr : d.en}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full h-full !mb-10 md:!pt-10 max-md:!px-4 !space-y-10">
        <Countdown date={releaseDate} renderer={renderer} />
        <HomeAlbumOverview albumMeta={HMData} />
      </div>
    </section>
  );
}

const HomeAlbumOverview = ({ albumMeta }: { albumMeta: Disk }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();

  const platforms = getStreamingPlatformInfo(albumMeta.urls);
  const type = renderDiskType(albumMeta.type);
  return (
    <div className="grid grid-rows-[auto_auto] grid-cols-4 w-full gap-2">
      <div className="!aspect-video z-10 lg:!ml-3 row-start-1 overflow-hidden lg:col-start-2 col-span-4 lg:col-span-3 bg-black w-full h-auto [&_>div]:h-full shadow-xl">
        <HMYoutubeEmbed img={albumMeta.image} />
      </div>
      <div className="w-auto shadow-2xl row-start-2 col-start-1 col-span-4 bg-white/75 flex flex-col justify-between gap-10 !-mt-4 lg:!-mt-12 lg:!mr-12 !p-6 ">
        <div className="!py-2 font-bold flex lg:flex-col w-full items-end lg:items-start">
          <span className="text-lg lg:!pl-1.5">
            {language === "ko" ? type.kr : type.en}
          </span>
          <h1 className="text-3xl !pl-1">[ {albumMeta.title} ]</h1>
        </div>
        <p className="w-full whitespace-break-spaces">
          {albumMeta.description}
        </p>
        <div className="flex flex-col gap-6 w-full">
          <div
            className="flex items-center gap-1 max-md:hover:underline underline-offset-4 max-md:hover:cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h2 className="font-bold !pl-1">아래에서 듣기</h2>
            {!minTablet && (
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            )}
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${minTablet || isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="pt-2">
              <StreamingPlatformButtons
                platforms={platforms}
                customClassName={
                  "max-md:flex-col [@media(max-width:1239px)]:w-[73%] max-md:!w-full"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HMYoutubeEmbed = ({ img }: { img: string }) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  return (
    <>
      {!isReady && (
        <div
          style={{ backgroundImage: `url(${img})` }}
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
