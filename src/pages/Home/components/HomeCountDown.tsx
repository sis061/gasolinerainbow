import _ from "lodash";
import Countdown from "react-countdown";
import cx from "classnames";
/************/
import useLanguageStore from "@/store/useLanguageStore";
import HomeAlbumOverview from "./HomeAlbumOverview";
/************/
import type { Disk } from "@/types/discography";

interface CountdownTimerProps {
  releaseDate: Date;
  albumMeta: Disk;
  videoId: string;
}

interface CountdownRendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  language: "ko" | "en" | string;
}
const pad = (n: number) => String(n).padStart(2, "0");

const HomeCountDown = ({
  releaseDate,
  albumMeta,
  videoId,
}: CountdownTimerProps) => {
  const { language } = useLanguageStore();

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
      return <HomeAlbumOverview videoId={videoId} albumMeta={albumMeta} />;
    }

    return (
      <CountdownRenderer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        language={language}
      />
    );
  };

  return <Countdown date={releaseDate} renderer={renderer} />;
};

export default HomeCountDown;

/******카운트다운 렌더******/

const CountdownRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  language,
}: CountdownRendererProps) => {
  const renderDate = [
    { count: days, kr: "일", en: "Days" },
    { count: hours, kr: "시간", en: "Hours" },
    { count: minutes, kr: "분", en: "Minutes" },
    { count: seconds, kr: "초", en: "Seconds" },
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
};
