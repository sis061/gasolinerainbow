import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import cx from "classnames";

import useLanguageStore from "@/store/useLanguageStore";
import StreamingModal from "../../modals/StreamingModal";
import BuyingModal from "../../modals/BuyingModal";

import type { Disk } from "@/types/discography";

const AlbumIntroPanel = ({ albumMeta }: { albumMeta: Disk }) => {
  const { image, titleKr, titleEn, year, urls } = albumMeta;
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const { language } = useLanguageStore();
  const isBandcampAvailable = Object.keys(urls).includes("bandcamp");

  return (
    <ul className="w-full h-full flex items-center gap-10 max-lg:flex-col justify-center lg:justify-between">
      <li className="relative overflow-hidden w-full h-full md:w-2/3 lg:w-[52.5%] !aspect-square">
        {!isImageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-[#333]" />
        )}
        <img
          src={image}
          alt="앨범 아트워크"
          className={cx(
            "w-full h-full object-cover transition-opacity duration-500",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
      </li>
      <li
        className={
          "max-lg:min-w-full lg:w-[47.5%] max-lg:gap-6 gap-16 flex-grow h-full flex flex-col items-center justify-center [&_*]:!text-white"
        }
      >
        {year && <span className="text-sm">{year}</span>}
        <span className="text-3xl md:text-5xl !text-center">
          {language === "ko" ? titleKr : titleEn}
        </span>

        <ol className="flex gap-6">
          <li>
            <StreamingModal albumMeta={albumMeta} />
          </li>
          {isBandcampAvailable && (
            <li>
              <BuyingModal albumMeta={albumMeta} />
            </li>
          )}
        </ol>
      </li>
    </ul>
  );
};

export default AlbumIntroPanel;
