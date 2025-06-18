import { lazy, Suspense, useState } from "react";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { ScaleLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

import useLanguageStore from "@/store/useLanguageStore";
import { renderDiskType } from "@/utils/globalHelper";
import { getStreamingPlatformInfo } from "@/components/StreamingPlatformButtons";
const StreamingPlatformButtons = lazy(
  () => import("@/components/StreamingPlatformButtons")
);

import HomeYoutubeEmbed from "./HomeYoutubeEmbed";

import type { Disk } from "@/types/discography";
import type { TargetCarouselProps } from "@/types/home";

const trimDescription = (description: string, lang: "ko" | "en") => {
  const endSentence: string =
    lang === "ko"
      ? "본연의 모습을 담고 싶었습니다."
      : "I believe we all carry.";
  const endIndex = description.indexOf(endSentence);
  if (endIndex === -1) return description;
  const trimmed = description.slice(0, endIndex + endSentence.length).trim();
  return `${trimmed}..`;
};

const HomeAlbumOverview = ({
  albumMeta,
  videoId,
  TargetCarousel,
}: {
  albumMeta: Disk;
  videoId: string;
  TargetCarousel: TargetCarouselProps;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();

  const platforms = getStreamingPlatformInfo(albumMeta.urls);
  const type = renderDiskType(albumMeta.type);

  const descTranslated =
    language === "ko" ? albumMeta.descriptionKr : albumMeta.descriptionEn;
  const trimmedDescription = trimDescription(descTranslated, language);

  const goToDiscography = () => {
    navigate("/discography", {
      state: {
        carouselIndex: TargetCarousel.carouselIndex,
        slideIndex: TargetCarousel.slideIndex,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="grid grid-rows-[auto_auto] grid-cols-4 w-full gap-2"
    >
      <div className="!aspect-video z-10 lg:!ml-3 row-start-1 overflow-hidden lg:col-start-2 col-span-4 lg:col-span-3 bg-black w-full h-auto [&_>div]:h-full shadow-xl">
        <HomeYoutubeEmbed id={videoId} img={albumMeta.image} />
      </div>
      <div className="w-auto shadow-2xl row-start-2 col-start-1 col-span-4 bg-white/75 flex flex-col justify-between gap-10 !-mt-4 lg:!-mt-12 lg:!mr-12 !p-6 ">
        <div className="!py-2 font-bold flex lg:flex-col w-full items-end lg:items-start">
          <span className="text-lg lg:!pl-1.5">
            {language === "ko" ? type.kr : type.en.toUpperCase()}
          </span>
          <h1 className="text-3xl !pl-1">
            [ {language === "ko" ? albumMeta.titleKr : albumMeta.titleEn} ]
          </h1>
        </div>
        <p className="w-full whitespace-break-spaces">{trimmedDescription}</p>
        <div>
          <button onClick={goToDiscography}>상세 정보로 이동</button>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <button
            className="flex items-center gap-1 max-md:hover:underline underline-offset-4 max-md:hover:cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="streaming-platforms"
          >
            <h2 className="font-bold !pl-1">
              {language === "ko" ? "아래에서 듣기" : "Stream"}
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
                    "max-md:flex-col [@media(max-width:1239px)]:w-[73%] max-md:!w-full"
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
