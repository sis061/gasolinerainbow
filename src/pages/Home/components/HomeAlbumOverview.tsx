import { lazy, Suspense, useState, type JSX } from "react";

import { motion } from "framer-motion";
import cx from "classnames";
import { AudioLines, ChevronDown } from "lucide-react";

import { ScaleLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";

import useLanguageStore from "@/store/useLanguageStore";
import { renderDiskType } from "@/utils/globalHelper";
import { getStreamingPlatformInfo } from "@/components/StreamingPlatformButtons";
const StreamingPlatformButtons = lazy(
  () => import("@/components/StreamingPlatformButtons")
);

import HomeYoutubeEmbed from "./HomeYoutubeEmbed";

import type { Disk } from "@/types/discography";
import GoToDiscButton from "@/components/GoToDiscButton";

const HomeAlbumOverview = ({
  isVideoRight = true,
  albumMeta,
  videoId,
  trimmedDescription = <></>,
}: {
  isVideoRight: boolean;
  albumMeta: Disk;
  videoId: string;
  trimmedDescription?: JSX.Element;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();

  const platforms = getStreamingPlatformInfo(albumMeta.urls);
  const type = renderDiskType(albumMeta.type);

  const description = trimmedDescription
    ? trimmedDescription
    : language === "ko"
      ? albumMeta.descriptionKr
      : albumMeta.descriptionEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // viewport={{ once: true, amount: 0.1 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="grid grid-rows-[auto_auto] grid-cols-4 w-full gap-2"
    >
      <div
        className={cx(
          isVideoRight ? "lg:col-start-2 lg:!ml-3" : "lg:col-start-1 lg:!mr-3",
          "!aspect-video z-10 row-start-1 overflow-hidden col-span-4 lg:col-span-3 bg-black w-full h-auto [&_>div]:h-full shadow-xl"
        )}
      >
        <HomeYoutubeEmbed id={videoId} img={albumMeta.image} />
      </div>
      <div
        className={cx(
          isVideoRight ? "lg:!mr-12 lg:!-mt-12" : "lg:!ml-12 lg:!-mt-12",
          "w-auto shadow-2xl row-start-2 col-start-1 col-span-4 bg-white/75 flex flex-col justify-between gap-10 !-mt-4 !p-6 "
        )}
      >
        <div
          className={cx(
            "!py-2 font-bold flex flex-col w-full max-lg:!items-start",
            isVideoRight ? "items-start" : "items-end"
          )}
        >
          <span className="text-sm">
            {language === "ko" ? type.kr : type.en.toUpperCase()}
          </span>
          <h1 className="text-2xl">
            {language === "ko" ? albumMeta.titleKr : albumMeta.titleEn}
          </h1>
        </div>
        <div className="!space-y-6 flex flex-col">
          <p className="w-full whitespace-break-spaces">{description}</p>
          <GoToDiscButton albumMeta={albumMeta} />
        </div>
        <hr className="border-black/20 !-my-2" />
        <div className="flex flex-col gap-6 w-full">
          <button
            className="group flex w-full !py-0.5 md:w-1/2 items-center justify-center md:justify-start gap-1 max-md:hover:underline underline-offset-4 max-md:hover:cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="streaming-platforms"
          >
            <AudioLines
              size={16}
              className={cx(
                "group-hover:animate-bounce",
                !isOpen && "max-lg:animate-bounce"
              )}
            />
            <h2 className="font-bold">
              {language === "ko" ? "아래에서 듣기" : "Listen"}
            </h2>
            {!minTablet && (
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            )}
          </button>

          <div
            className={`transition-all duration-300 overflow-hidden ${minTablet || isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="pt-2">
              <Suspense
                fallback={
                  <ScaleLoader
                    color="#BFBFBF"
                    barCount={7}
                    height={20}
                    margin={3}
                    radius={0}
                    width={5}
                  />
                }
              >
                <StreamingPlatformButtons
                  customClassName={
                    "max-md:flex-col [@media(max-width:1239px)]:w-[73%] max-md:!w-full max-md:[&_button]:!py-5"
                  }
                  platforms={platforms}
                  aria-describedby="drawer-description"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeAlbumOverview;
