import { useCallback, useEffect, useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

import { ScaleLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";
import { useInView } from "react-intersection-observer";
import map from "lodash/map";
import DOMPurify from "dompurify";

import useLanguageStore from "@/store/useLanguageStore";
import { withImagePreload } from "@/utils/withImagePreload";
import { newsData } from "@/utils/newsData";
import {
  formatDateByLang,
  linkify,
  renderNewsTypeColor,
} from "@/utils/globalHelper";
import type { News } from "@/types/news";

const ITEMS_PER_PAGE = 4;
const REVERSED_NEWS = [...newsData].slice().reverse();
const preloadUrls = REVERSED_NEWS.slice(0, ITEMS_PER_PAGE).map(
  (item) => item.img
);

const News = () => {
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleNews, setVisibleNews] = useState(
    REVERSED_NEWS.slice(0, ITEMS_PER_PAGE)
  );
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(
    new Array(REVERSED_NEWS.length).fill(false)
  );
  const [page, setPage] = useState<number>(1);
  const fallbackTimer = useRef<NodeJS.Timeout | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();

  // main inView for "load more" trigger
  const { ref, inView } = useInView();

  // ❗ 각 뉴스 아이템에 대한 inView hook을 미리 만들어둠
  const inViewHooks = REVERSED_NEWS.map(() =>
    useInView({ triggerOnce: true, threshold: 0.2 })
  );

  const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
    accordionRefs.current[index] = el;
  }, []);

  const scrollToItem = useCallback(
    (index: number) => {
      const el = accordionRefs.current[index];
      if (!el) return;
      const offset = minTablet ? 98 : 64;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;

      setTimeout(() => {
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }, 100);
    },
    [minTablet]
  );

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  useEffect(() => {
    if (inView && visibleNews.length < newsData.length) {
      loadMore();
    }
  }, [inView]);

  useEffect(() => {
    if (visibleNews.length < newsData.length) {
      fallbackTimer.current = setTimeout(() => {
        setShowFallback(true);
      }, 4000);
    }

    return () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    };
  }, [visibleNews]);

  const loadMore = () => {
    const nextPage = page + 1;
    const nextItems = REVERSED_NEWS.slice(0, nextPage * ITEMS_PER_PAGE);
    setVisibleNews(nextItems);
    setPage(nextPage);
    setShowFallback(false);
  };

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-scroll !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full flex flex-col md:!pt-10 items-start justify-between max-md:!px-4">
        <Accordion type="single" collapsible className="max-w-full w-full">
          {map(visibleNews, (news, i) => {
            const { ref: imgRef, inView: imgInView } = inViewHooks[i];
            const sanitizeContent = DOMPurify.sanitize(
              linkify(news?.content ?? "")
            );

            return (
              <AccordionItem
                ref={(el) => {
                  setRef(el, i);
                  imgRef(el);
                }}
                key={news.idx}
                value={`${news.idx}`}
                className="!pb-10 w-full !border-0"
                onClick={() => scrollToItem(i)}
              >
                <AccordionTrigger className="w-full !-mt-0.5 [&>svg]:hidden group hover:shadow-md">
                  <div className="relative w-full min-h-48 lg:min-h-64 flex items-end justify-start group cursor-pointer transition-all duration-200 hover:opacity-90">
                    {!imageLoaded[i] && (
                      <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-[#333]" />
                    )}

                    {imgInView && (
                      <>
                        <img
                          src={news.img}
                          alt={news.title}
                          className="hidden"
                          onLoad={() => handleImageLoad(i)}
                          // loading="lazy"
                        />
                        <div
                          className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-opacity duration-500"
                          style={{
                            backgroundImage: `url(${news.img})`,
                            opacity: imageLoaded[i] ? 1 : 0,
                          }}
                        />
                      </>
                    )}

                    <span
                      style={{ borderColor: renderNewsTypeColor(news.type) }}
                      className="relative z-10 !text-white !text-md md:text-lg lg:text-xl bg-[#000] opacity-80 border-l-5 !p-3 !m-3 duration-200 group-hover:opacity-100"
                    >
                      {news.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="!p-6 !z-10 flex flex-col gap-6 bg-white">
                  <p
                    className="w-full whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: sanitizeContent }}
                  />
                  <div className="flex w-full items-center justify-between !px-2">
                    <span className="text-right font-semibold">
                      {formatDateByLang(news.date, language)}
                    </span>
                    <AccordionTrigger className="flex items-center justify-center *:w-5 *:h-5 cursor-pointer" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {visibleNews.length < newsData.length && (
          <div
            ref={ref}
            className="h-auto !mb-4 flex items-center w-full justify-center"
          >
            <ScaleLoader
              color="#BFBFBF"
              barCount={7}
              height={20}
              margin={3}
              radius={0}
              width={5}
            />
          </div>
        )}

        {showFallback && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button onClick={loadMore}>
              {language === "ko" ? "더 보기" : "Load more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default withImagePreload(News, preloadUrls);
