import { useCallback, useEffect, useRef, useState } from "react";
/************/
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
/************/
import map from "lodash/map";
import DOMPurify from "dompurify";
import { useMediaQuery } from "react-responsive";
import { useInView } from "react-intersection-observer";
/************/
import useLanguageStore from "@/store/useLanguageStore";
import { newsData } from "@/utils/newsData";
import {
  formatDateByLang,
  linkify,
  renderNewsTypeColor,
} from "@/utils/globalHelper";
import type { News } from "@/types/news";
import { ScaleLoader } from "react-spinners";

const ITEMS_PER_PAGE = 4;
const reversedNews = [...newsData].slice().reverse();

export default function News() {
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleNews, setVisibleNews] = useState(
    reversedNews.slice(0, ITEMS_PER_PAGE)
  );
  const [page, setPage] = useState<number>(1);
  const { ref, inView } = useInView();
  const fallbackTimer = useRef<NodeJS.Timeout | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();

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

  // inView 감지되면 다음 페이지 로딩
  useEffect(() => {
    if (inView && visibleNews.length < newsData.length) {
      loadMore();
    }
  }, [inView]);

  useEffect(() => {
    if (visibleNews.length < newsData.length) {
      fallbackTimer.current = setTimeout(() => {
        setShowFallback(true);
      }, 4000); // 4초간 inView 감지가 없으면 fallback 버튼
    }

    return () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    };
  }, [visibleNews]);

  const loadMore = () => {
    const nextPage = page + 1;
    const nextItems = reversedNews.slice(0, nextPage * ITEMS_PER_PAGE);
    setVisibleNews(nextItems);
    setPage(nextPage);
    setShowFallback(false);
  };

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-scroll !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full flex flex-col md:!pt-10 items-start justify-between max-md:!px-4">
        <Accordion type="single" collapsible className="max-w-full w-full">
          {map(visibleNews, (news, i) => {
            const sanitizeContent = DOMPurify.sanitize(
              linkify(news?.content ?? "")
            );

            return (
              <AccordionItem
                ref={(el) => setRef(el, i)}
                key={news.idx}
                value={`${news.idx}`}
                className="!pb-10 w-full !border-0"
                onClick={() => scrollToItem(i)}
              >
                <AccordionTrigger className="w-full !-mt-0.5 [&>svg]:hidden group hover:shadow-md">
                  <div
                    className="!bg-[length:105%] bg-center bg-no-repeat group-hover:!bg-[length:100%] w-full min-h-48 lg:min-h-64 flex items-end justify-start cursor-pointer transition-all hover:opacity-90 duration-200 hover:[&_>span]:opacity-100"
                    style={{
                      backgroundImage: `url(${news.img})`,
                    }}
                  >
                    <span
                      style={{ borderColor: renderNewsTypeColor(news.type) }}
                      className=" !text-white !text-md md:text-lg lg:text-xl bg-[#000] opacity-80 border-l-5 !p-3 !m-3 duration-200"
                    >
                      {news.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="!p-6 !z-10 flex flex-col gap-6 bg-white">
                  <p
                    className="w-full whitespace-pre-wrap "
                    dangerouslySetInnerHTML={{ __html: sanitizeContent }}
                  />
                  <div className="flex w-full items-center justify-between !px-2">
                    <span className="text-right font-semibold">
                      {/* {formatTimestamp(+news.date, language)} */}
                      {formatDateByLang(news.date, language)}
                    </span>
                    <AccordionTrigger className="flex items-center justify-center *:w-5 *:h-5 cursor-pointer" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        {/* Trigger sentinel */}
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
}
