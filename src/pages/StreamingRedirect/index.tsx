import { Suspense, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ScaleLoader } from "react-spinners";
import { useParams } from "react-router-dom";

import cx from "classnames";

import PageNotFound from "../PageNotFound";
import { DiskMetaMap } from "@/utils/diskMetaDatas";
import useLanguageStore from "@/store/useLanguageStore";
import StreamingPlatformButtons, {
  getStreamingPlatformInfo,
} from "@/components/StreamingPlatformButtons";

const StreamingRedirect = () => {
  const { albumId } = useParams();
  const albumMeta = albumId ? DiskMetaMap[albumId] : null;

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const { language } = useLanguageStore();

  const platforms = getStreamingPlatformInfo(
    albumMeta ? albumMeta?.urls : DiskMetaMap["hm"].urls
  );

  if (!albumMeta) return <PageNotFound />;
  return (
    <section className="wrapper-full w-full min-h-screen overflow-x-hidden !mx-auto flex justify-center items-center max-md:!px-4 relative">
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={albumMeta?.image}
          alt="앨범 아트워크 백그라운드"
          className={cx(
            "w-full h-full object-cover transition-opacity duration-500 brightness-[0.3] blur-sm",
            isImageLoaded ? "opacity-100 " : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="inner flex-grow-0 h-full w-full flex flex-col items-start justify-between !p-6 z-10 max-lg:!py-10">
        <ul className="w-full h-full flex items-center gap-10 max-lg:flex-col justify-center lg:justify-between ">
          <li className="relative overflow-hidden w-full h-full md:w-2/3 lg:w-[52.5%] !aspect-square">
            {!isImageLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-none bg-[#333]" />
            )}
            <img
              src={albumMeta?.image}
              alt="앨범 아트워크"
              className={cx(
                "w-full h-full object-cover transition-opacity duration-500 !shadow-2xl",
                isImageLoaded ? "opacity-100 " : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
          </li>
          <li
            className={
              "max-lg:min-w-full lg:w-[47.5%] max-lg:gap-6 gap-6 flex-grow h-full flex flex-col items-center justify-center [&_*]:!text-white"
            }
          >
            <div className="flex flex-col items-center justify-between gap-2">
              {albumMeta?.year && (
                <span className="text-sm">{albumMeta?.year}</span>
              )}
              <span className="text-xl md:text-2xl !text-center">
                {language === "ko" ? albumMeta?.titleKr : albumMeta?.titleEn}
              </span>
            </div>

            <div className="w-full  md:!w-2/3 lg:!w-full">
              <Suspense
                fallback={
                  <ScaleLoader
                    color="#BFBFBF"
                    barCount={7}
                    height={20}
                    margin={3}
                    radius={0}
                    width={5}
                  />
                }
              >
                <StreamingPlatformButtons
                  customClassName={"!flex-col !w-full max-lg:[&_button]:!py-6"}
                  platforms={platforms}
                  aria-describedby="drawer-description"
                />
              </Suspense>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default StreamingRedirect;
