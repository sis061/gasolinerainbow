import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Disc3 } from "lucide-react";

import { Link } from "react-router-dom";
import cx from "classnames";

import StreamingModal from "../../modals/StreamingModal";
import useLanguageStore from "@/store/useLanguageStore";

import type { Disk } from "@/types/discography";

const AlbumIntroPanel = ({ albumMeta }: { albumMeta: Disk }) => {
  const { image, titleKr, titleEn, year, isCD, cdUrl } = albumMeta;
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const { language } = useLanguageStore();

  return (
    <ul className="w-full flex items-center gap-10 max-lg:flex-col">
      <li className="relative overflow-hidden w-full md:w-2/3 lg:w-auto !aspect-square">
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
          "min-w-full lg:min-w-[45%] max-lg:gap-6 gap-16 flex-grow h-auto flex flex-col items-center justify-center [&_*]:!text-white"
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

          {isCD && cdUrl && (
            <li className="transition-all duration-200 hover:opacity-50 group">
              <Link
                to={cdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-all duration-200"
              >
                <Disc3 size={16} className="group-hover:animate-spin" />
                {language === "ko" ? "CD 구매" : "Order"}
              </Link>
            </li>
          )}
        </ol>
      </li>
    </ul>
  );
};

export default AlbumIntroPanel;
