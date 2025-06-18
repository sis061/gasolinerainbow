import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import cx from "classnames";
import type { MultipleIntroPanelProps } from "@/types/discography";

const MultipleIntroPanel = ({
  image,
  title,
  year,
}: MultipleIntroPanelProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  return (
    <ul className="w-full flex items-center gap-10 max-lg:flex-col !px-2">
      <li className="relative !aspect-square overflow-hidden w-full md:w-2/3 lg:w-auto ">
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
          loading="lazy"
        />
      </li>
      <li className="min-w-full lg:min-w-[45%] flex-grow h-auto flex flex-col gap-6 items-center justify-center [&_*]:!text-white">
        {year && <span className="text-sm">{String(year)} ~</span>}
        <span className="text-3xl md:text-5xl text-center">{title}</span>
      </li>
    </ul>
  );
};

export default MultipleIntroPanel;
