import React from "react";

import map from "lodash/map";
import Countdown from "react-countdown";
import cx from "classnames";
import { motion, AnimatePresence } from "framer-motion";

import useLanguageStore from "@/store/useLanguageStore";
import HomeAlbumOverview from "./HomeAlbumOverview";
import type { CountdownRendererProps, CountdownTimerProps } from "@/types/home";

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

      return (
        <HomeAlbumOverview
          isVideoRight
          videoId={videoId}
          albumMeta={albumMeta}
        />
      );

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

const CountdownRenderer = React.memo(
  ({ days, hours, minutes, seconds, language }: CountdownRendererProps) => {
    const renderDate = [
      { count: days, kr: "일", en: "Days" },
      { count: hours, kr: "시간", en: "Hours" },
      { count: minutes, kr: "분", en: "Minutes" },
      { count: seconds, kr: "초", en: "Seconds" },
    ];

    return (
      <div className="min-h-[calc(100dvh-8rem)] md:!-mt-16 max-md:!-px-4 w-full flex items-center justify-center gap-4">
        {map(renderDate, (d) => {
          // 'Days'가 0 이하인 경우 렌더링 제외
          if (d.en === "Days" && d.count <= 0) return null;

          // 두 자리 문자열로 변환 (예: 5 → "05", 35 → "35")
          const twoDigit = pad(d.count);
          const [tensChar, onesChar] = [twoDigit[0], twoDigit[1]];

          return (
            <div
              key={d.en}
              className="flex w-full flex-col items-center justify-center gap-1 *:!text-white/75"
              aria-label={`${d.count} ${language === "ko" ? d.kr : d.en}`}
            >
              <div className="flex *:!text-white/75">
                {/* 십의 자리 */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${d.en}-tens-${tensChar}`}
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums"
                  >
                    {tensChar}
                  </motion.span>
                </AnimatePresence>

                {/* 일의 자리 */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${d.en}-ones-${onesChar}`}
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums"
                  >
                    {onesChar}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* 단위 라벨 */}
              <span
                className={cx(
                  "text-center opacity-75",
                  language === "ko"
                    ? "text-md md:text-lg lg:text-xl"
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
);

// const CountdownRenderer = ({
//   days,
//   hours,
//   minutes,
//   seconds,
//   language,
// }: CountdownRendererProps) => {
//   const renderDate = [
//     { count: days, kr: "일", en: "Days" },
//     { count: hours, kr: "시간", en: "Hours" },
//     { count: minutes, kr: "분", en: "Minutes" },
//     { count: seconds, kr: "초", en: "Seconds" },
//   ];

//   return (
//     <div className="min-h-[calc(100dvh-8rem)] md:!-mt-16 max-md:!-px-4 w-full flex items-center justify-center gap-4">
//       {map(renderDate, (d) => {
//         // 'Days'가 0 이하인 경우 렌더링 제외
//         if (d.en === "Days" && d.count <= 0) return null;

//         // 두 자리 문자열로 변환 (예: 5 → "05", 35 → "35")
//         const twoDigit = pad(d.count);
//         const [tensChar, onesChar] = [twoDigit[0], twoDigit[1]];

//         return (
//           <div
//             key={d.en}
//             className="flex w-full flex-col items-center justify-center gap-1"
//             aria-label={`${d.count} ${language === "ko" ? d.kr : d.en}`}
//           >
//             <div className="flex">
//               {/* 십의 자리 */}
//               <AnimatePresence mode="wait">
//                 <motion.span
//                   key={`${d.en}-tens-${tensChar}`}
//                   initial={{ y: -12, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   exit={{ y: 12, opacity: 0 }}
//                   transition={{ duration: 0.3, ease: "easeInOut" }}
//                   className="text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums"
//                 >
//                   {tensChar}
//                 </motion.span>
//               </AnimatePresence>

//               {/* 일의 자리 */}
//               <AnimatePresence mode="wait">
//                 <motion.span
//                   key={`${d.en}-ones-${onesChar}`}
//                   initial={{ y: -12, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   exit={{ y: 12, opacity: 0 }}
//                   transition={{ duration: 0.3, ease: "easeInOut" }}
//                   className="text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums"
//                 >
//                   {onesChar}
//                 </motion.span>
//               </AnimatePresence>
//             </div>

//             {/* 단위 라벨 */}
//             <span
//               className={cx(
//                 "text-center opacity-75",
//                 language === "ko"
//                   ? "text-md md:text-lg lg:text-xl"
//                   : "text-sm md:text-md lg:text-lg"
//               )}
//             >
//               {language === "ko" ? d.kr : d.en}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
