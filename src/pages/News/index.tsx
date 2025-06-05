import { useCallback, useRef } from "react";
/************/
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
/************/
import map from "lodash/map";
import reverse from "lodash/reverse";
import DOMPurify from "dompurify";
import { useMediaQuery } from "react-responsive";
/************/
import useLanguageStore from "@/store/useLanguageStore";
import { newsData } from "@/utils/newsData";
import {
  formatDateByLang,
  linkify,
  renderNewsTypeColor,
} from "@/utils/globalHelper";

export default function News() {
  const AccordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();

  const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
    AccordionRefs.current[index] = el;
  }, []);

  const scrollToItem = (i: number): void => {
    const ref = AccordionRefs.current[i];
    if (ref) {
      const offset = minTablet ? 98 : 64;
      const y = ref.getBoundingClientRect().top + window.scrollY - offset;

      setTimeout(() => {
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }, 300);
    }
  };

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-scroll !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full flex flex-col md:!pt-10 items-start justify-between max-md:!px-4">
        <Accordion type="single" collapsible className="max-w-full w-full">
          {map(reverse([...newsData]), (news, i) => {
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
      </div>
    </section>
  );
}
