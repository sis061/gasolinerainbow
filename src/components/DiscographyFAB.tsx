import { ListOrdered } from "lucide-react";
import cx from "classnames";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DiscographyFAB({
  isFooterVisible,
}: {
  isFooterVisible: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className={cx(
          "cursor-pointer !p-1 rounded-full max-lg:right-8 right-12 z-50 bg-white/75 hover:bg-white text-black shadow-md transition-all duration-150",
          isFooterVisible
            ? "absolute -top-16 md:-top-16 lg:-top-18"
            : "fixed bottom-32 md:bottom-20 lg:bottom-8"
        )}
        aria-label="Discography Info"
      >
        <ListOrdered size={32} />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        alignOffset={15}
        asChild
        className="text-sm bg-black/90 max-w-36 !p-4 !rounded-br-none flex items-center justify-center"
      >
        <ul className=" *:!text-white [&_strong]:!text-[16px] [&_strong]:!text-white [&_strong]:font-bold flex flex-col gap-3 justify-between items-center ">
          <li>
            <strong>앨범 소개</strong>를 눌러
            <br />
            설명 보기
          </li>
          <li>
            <strong>트랙 제목</strong>을 눌러
            <br />
            가사 보기
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
