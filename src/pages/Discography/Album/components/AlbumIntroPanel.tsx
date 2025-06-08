import { Link } from "react-router-dom";
import StreamingModal from "../../modals/StreamingModal";
import type { Disk } from "@/types/discography";
import useLanguageStore from "@/store/useLanguageStore";

const AlbumIntroPanel = ({ albumMeta }: { albumMeta: Disk }) => {
  const { image, titleKr, titleEn, year, isCD, cdUrl } = albumMeta;

  const { language } = useLanguageStore();
  return (
    <ul className="w-full flex items-center gap-10 max-lg:flex-col">
      <li className="bg-gray-600 overflow-hidden w-full md:w-2/3 lg:w-auto">
        <img src={image} alt="앨범 아트워크" className="w-full h-full" />
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
            <li className="transition-all duration-200 hover:opacity-50">
              <Link to={cdUrl} target="_blank" rel="noopener noreferrer">
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
