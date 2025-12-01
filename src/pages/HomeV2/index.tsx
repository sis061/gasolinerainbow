import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { allDisks } from "@/utils/diskMetaDatas";
import { newsData } from "@/utils/newsData";
import { noteData } from "@/utils/noteData";
import defaultImg from "@/assets/images/homeDefaultImg.webp";

import type { Disk, TargetCarouselProps } from "@/types/discography";
import type { News } from "@/types/news";
import type { Note } from "@/types/note";

import { Skeleton } from "@/components/ui/skeleton";
import cx from "classnames";
import { useNavigate } from "react-router-dom";

import { getUserPlatformType } from "@/utils/globalHelper";
import { withImagePreload } from "@/utils/withImagePreload";
import useLanguageStore from "@/store/useLanguageStore";
import useDiscographyStore from "@/store/useDiscographyStore";
import CustomBadge from "@/components/CustomBadge";

interface HomeItemBase {
  date: string;
  titleKr: string;
  titleEn: string;
  image: string;
}

// 디스코그래피 카드
interface DiscographyHomeItem extends HomeItemBase {
  type: "discography";
  redirectTo: TargetCarouselProps;
}

// 소식 || 작가의말 카드
interface NewsHomeItem extends HomeItemBase {
  type: "news" | "note";
  redirectTo: string;
}

export type HomeItemProps = DiscographyHomeItem | NewsHomeItem;

function StripDiskItems(disks: Disk[]) {
  return disks.map((item) => ({
    type: "discography" as "discography",
    date: item.date,
    titleKr: item.titleKr,
    titleEn: item.titleEn,
    image: item.image ?? defaultImg,
    redirectTo: item.targetCarousel,
  }));
}

function StripNewsItems(news: News[]) {
  return news.map((item) => ({
    type: "news" as "news",
    date: item.date,
    titleKr: item.titleKr,
    titleEn: item.titleEn,
    image: item.image ?? defaultImg,
    redirectTo: `/news?idx=${item.idx}`,
  }));
}

function StripNotesItems(notes: Note[]) {
  return notes.map((item) => ({
    type: "note" as "note",
    date: item.date,
    titleKr: item.title,
    titleEn: item.title,
    image: item.image ?? defaultImg,
    redirectTo: `/authornote/${item.idx}`,
  }));
}

function renderByType(type: string) {
  let result = { kr: "", en: "", color: "" };
  switch (type) {
    case "discography":
      result.color = "#ff0000";
      result.kr = "디스코그라피";
      result.en = "Discography";
      break;
    case "news":
      result.color = "#D500F9";
      result.kr = "소식";
      result.en = "News";
      break;
    case "note":
      result.color = "#795548";
      result.kr = "작가의 말";
      result.en = "Notes";
      break;

    default:
      result;
      break;
  }
  return result;
}

const HOME_ITEMS: HomeItemProps[] = [
  ...StripDiskItems(allDisks),
  ...StripNewsItems(newsData),
  ...StripNotesItems(noteData),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const getPreloadCount = () => {
  if (typeof window === "undefined") {
    // 혹시 모듈 로드 시점에 안전용 디폴트
    return 8;
  }

  const w = window.innerWidth;

  if (w >= 1024) return 20;
  if (w >= 768) return 16;
  if (w >= 640) return 12;
  return 8;
};

const INITIAL_PAGE_SIZE = getPreloadCount();
const PAGE_SIZE = INITIAL_PAGE_SIZE / 4;

const preloadUrls = HOME_ITEMS.slice(0, INITIAL_PAGE_SIZE).map(
  (item) => item.image
);

const HomeV2 = () => {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const { setGoToDiscActive } = useDiscographyStore();

  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(() =>
    new Array(HOME_ITEMS.length).fill(false)
  );

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  // “밑바닥에 닿았는지” 감지할 sentinel
  const { ref: bottomRef, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    if (visibleCount >= HOME_ITEMS.length) return;

    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, HOME_ITEMS.length));
  }, [inView, visibleCount]);

  const platformType = getUserPlatformType();
  const isUserAgentPC = platformType === "desktop";

  function redirectByType(item: HomeItemProps) {
    if (item.type === "discography") {
      setGoToDiscActive(true);
      setTimeout(() => {
        navigate("/discography", {
          state: {
            carouselIndex: item.redirectTo.carouselIndex,
            slideIndex: item.redirectTo.slideIndex,
          },
        });
      }, 0);
      return;
    }

    navigate(item.redirectTo);
  }

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-scroll !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full flex flex-col md:!pt-10 items-start justify-between max-md:!px-4 max-md:!mt-4 !mb-4">
        <div className="flex-wrap flex gap-4 group w-full">
          {HOME_ITEMS.slice(0, visibleCount).map((item, index) => (
            <div
              key={index}
              className="relative group/item w-[calc((100%/2)-0.5rem)] sm:w-[calc((100%/3)-0.675rem)] md:w-[calc((100%/4)-0.75rem)] lg:w-[calc((100%/5)-0.8rem)] shadow-lg
              aspect-square md:aspect-3/4 transition-opacity duration-300 cursor-pointer"
              onClick={() => redirectByType(item)}
            >
              <CustomBadge
                label="N"
                startDate={item?.date}
                placement={isUserAgentPC ? "top-right" : "bottom-right"}
              />
              {!imageLoaded[index] && (
                <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-[#333]" />
              )}

              {/* 첫 페이지는 eager, 이후는 lazy 로 살짝 최적화 */}
              <img
                src={item.image}
                alt={item.titleKr}
                className="absolute w-0 h-0 opacity-0 -z-10"
                onLoad={() => handleImageLoad(index)}
                loading={index < INITIAL_PAGE_SIZE ? "eager" : "lazy"}
              />

              <div className="absolute inset-0 bg-black z-10 opacity-0 group-hover:opacity-50 group-active:opacity-50 hover:opacity-0 active:opacity-0 transition-opacity duration-300 ease-in-out" />

              <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover transform group-hover/item:scale-105 group-active/item:scale-105 transition-all duration-300 ease-in-out"
                style={{
                  backgroundImage: `url(${item.image})`,
                  opacity: imageLoaded[index] ? 1 : 0,
                }}
              />

              <div
                style={{
                  borderColor: renderByType(item.type)?.color ?? "#000",
                }}
                className={cx(
                  "absolute *:!text-white *:text-sm bg-[#000] border-l-2 !px-2 !py-1.5 !space-y-1 transition-all duration-300 ease-in-out ",
                  isUserAgentPC
                    ? "bottom-0 opacity-0 group-hover/item:opacity-90 -translate-x-6  group-hover/item:translate-x-0"
                    : "top-0 opacity-75 group-hover/item:opacity-90 group-active/item:opacity-90 !m-1 group-hover/item:!m-0 group-active/item:!m-0"
                )}
              >
                <span className="!font-bold !text-xs block">
                  {language === "ko"
                    ? renderByType(item.type)?.kr
                    : renderByType(item.type)?.en}
                </span>
                <span className="block leading-snug whitespace-normal line-clamp-2 group-active/item:!line-clamp-none group-hover/item:!line-clamp-none">
                  {language === "ko" ? item.titleKr : item.titleEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 아직 보여줄 카드가 남아 있으면 sentinel 렌더 */}
        {visibleCount < HOME_ITEMS.length && (
          <div ref={bottomRef} className="h-12 w-full" />
        )}
      </div>
    </section>
  );
};

export default withImagePreload(HomeV2, preloadUrls);
