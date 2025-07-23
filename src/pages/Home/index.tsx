import filter from "lodash/filter";
import { useNavigate } from "react-router-dom";

import useLanguageStore from "@/store/useLanguageStore";
import HomeAlbumOverview from "./components/HomeAlbumOverview";
import { DiskMetaDatas } from "@/utils/diskMetaDatas";
import type { Disk } from "@/types/discography";
import type { JSX } from "react";
// import HomeCountDown from "./components/HomeCountDown";

export default function Home() {
  const navigate = useNavigate();
  const { language } = useLanguageStore();

  // const RELEASE_DATE = new Date("2025-07-23T12:00:00");

  // const HMVideoId: string = "q0RXd1Tj7tk";
  const TMMSVideoId: string = "VwiyiS41qwo";
  const BIPVideoId: string = "PpuMhJWT0qg";

  // const [HMData] = filter(
  //   DiskMetaDatas.albumMetaDatas,
  //   (data) => data.titleEn.toLowerCase() === "Hm".toLowerCase()
  // );

  const [TMMSData] = filter(
    DiskMetaDatas.othersMetaDatas,
    (data) =>
      data.titleEn.toLowerCase() === "The Monkey/Mother-ship".toLowerCase()
  );

  const [BIPData] = filter(
    DiskMetaDatas.albumMetaDatas,
    (data) => data.titleKr.toLowerCase() === "평화로운 뇌와…".toLowerCase()
  );

  // const goToDiscography = (albumMeta: Disk) => {
  //   navigate("/discography", {
  //     state: {
  //       carouselIndex: albumMeta?.targetCarousel.carouselIndex,
  //       slideIndex: albumMeta?.targetCarousel.slideIndex,
  //     },
  //   });
  // };

  const goToNote = (t: number) => {
    navigate(`/authornote/${t}`);
  };

  // const HMEndSentence: string =
  //   language === "ko"
  //     ? "본연의 모습을 담고 싶었습니다."
  //     : "I believe we all carry.";

  // const HMTrimmedDescription = trimDescription(
  //   HMData,
  //   language,
  //   goToDiscography,
  //   HMData,
  //   HMEndSentence
  // );
  const TMMSTrimmedDescription = trimDescription(
    TMMSData,
    language,
    goToNote,
    6
  );

  const BIPTrimmedDescription = trimDescription(BIPData, language, goToNote, 5);

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full h-full !mb-10 !pt-4 md:!pt-10 max-md:!px-4 !space-y-20">
        {/* <HomeCountDown
          releaseDate={RELEASE_DATE}
          albumMeta={BIPData}
          videoId={BIPVideoId}
        /> */}
        <HomeAlbumOverview
          isVideoRight
          videoId={BIPVideoId}
          albumMeta={BIPData}
          trimmedDescription={BIPTrimmedDescription}
        />
        <HomeAlbumOverview
          isVideoRight={false}
          videoId={TMMSVideoId}
          albumMeta={TMMSData}
          trimmedDescription={TMMSTrimmedDescription}
        />
        {/* <HomeAlbumOverview
          isVideoRight={false}
          videoId={HMVideoId}
          albumMeta={HMData}
          trimmedDescription={HMTrimmedDescription}
        /> */}
      </div>
    </section>
  );
}

const trimDescription = <T = void,>(
  albumMeta: Disk,
  lang: "ko" | "en",
  dir: (params: T) => void,
  dirParam: T,
  endSentence?: string
) => {
  const description =
    lang === "ko" ? albumMeta.descriptionKr : albumMeta.descriptionEn;

  const DirBtn: JSX.Element = (
    <button
      onClick={() => dir(dirParam)}
      className="!ml-1 cursor-pointer hover:!text-blue-800 transition-colors"
      aria-label={lang === "ko" ? "상세 보기" : "View Detail"}
    >
      {"[...]"}
    </button>
  );

  if (!endSentence) {
    return (
      <>
        {description}
        {DirBtn}
      </>
    );
  }

  const endIndex = description.indexOf(endSentence);
  if (endIndex === -1) return <>{description}</>;

  const trimmed = description.slice(0, endIndex + endSentence.length).trim();

  return (
    <>
      {trimmed}
      {DirBtn}
    </>
  );
};
