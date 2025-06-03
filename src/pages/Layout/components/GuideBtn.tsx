import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleHelp } from "lucide-react";
/************/
import cx from "classnames";
/************/
import useLanguageStore from "@/store/useLanguageStore";

export default function GuideBtn({
  isFooterVisible,
}: {
  isFooterVisible: boolean;
}) {
  const { language } = useLanguageStore();

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className={cx(
          "cursor-pointer rounded-full right-6 md:right-8 lg:right-12 z-50 bg-yellow-500/75 hover:bg-white text-black shadow-md transition-all duration-150",
          isFooterVisible
            ? "absolute -top-16 md:-top-16 lg:-top-18"
            : "fixed bottom-32 lg:bottom-18"
        )}
        aria-label="Discography Info"
      >
        <CircleHelp size={40} className="animate-pulse" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        alignOffset={25}
        asChild
        className="text-sm bg-black/90 !p-4 !rounded-br-none flex items-start justify-start"
      >
        <ul
          className={cx(
            language === "ko" ? "max-w-44" : "max-w-41",
            "*:!text-white *:[&_strong]:!text-[16px] [&_strong]:!text-white [&_strong]:font-bold flex flex-col gap-3"
          )}
        >
          {language === "ko" ? (
            <>
              <li>
                <strong>앨범[노래] 소개</strong>를 눌러 상세 보기
              </li>
              <li>
                <strong>트랙 제목</strong>을 눌러 가사 보기
              </li>
            </>
          ) : (
            <>
              <li>
                Tab <strong>About</strong> to view details.
              </li>
              <li>
                Tab the <strong>Track Title</strong> to view lyrics.
              </li>
            </>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
