import cx from "classnames";
import { Disc3 } from "lucide-react";

import useLanguageStore from "@/store/useLanguageStore";
import { useNavigate } from "react-router-dom";

import type { Disk } from "@/types/discography";

const GoToDiscButton = ({
  albumMeta,
  isOneline = false,
}: {
  albumMeta: Disk;
  isOneline?: boolean;
}) => {
  const navigate = useNavigate();

  const { language } = useLanguageStore();

  const goToDiscography = () => {
    navigate("/discography", {
      state: {
        carouselIndex: albumMeta?.targetCarousel.carouselIndex,
        slideIndex: albumMeta?.targetCarousel.slideIndex,
      },
    });
  };

  return (
    <button
      onClick={goToDiscography}
      className={cx(
        "*:whitespace-break-spaces self-end !px-2 !max-w-38 !py-0.5 group flex justify-end gap-1 cursor-pointer max-lg:underline underline-offset-4 *:transition-all *:duration-200",
        language === "ko" ? "!items-start" : "!items-end",
        isOneline && "!self-center !max-w-full !no-underline"
      )}
    >
      {isOneline ? (
        <div className="flex w-full items-center justify-center gap-1 group">
          <Disc3
            size={16}
            className={cx("animate-spin group-hover:animate-none")}
          />
          <div>
            {language === "ko" ? (
              <span>
                <span className="!font-bold group-hover:underline max-lg:underline">
                  디스코그라피
                </span>
                에서 자세히 보기
              </span>
            ) : (
              <span>
                See More in{" "}
                <span className="!font-bold group-hover:underline max-lg:underline">
                  DISCOGRAPHY
                </span>
              </span>
            )}
          </div>
        </div>
      ) : (
        <>
          <Disc3
            size={16}
            className={cx(
              "animate-spin group-hover:animate-none",
              language === "ko" ? "!mt-1" : "!mb-1"
            )}
          />
          <div className="flex flex-col">
            <span className={"!text-right flex justify-end"}>
              {language === "ko" && (
                <h3 className="!font-bold group-hover:underline">
                  디스코그라피
                </h3>
              )}
              {language === "ko" ? "에서" : "See More in"}
            </span>
            <span
              className={cx(
                "!text-right",
                language === "en" && "!font-bold group-hover:underline"
              )}
            >
              {language === "ko" ? "자세히 보기" : "DISCOGRAPHY"}
            </span>
          </div>
        </>
      )}
    </button>
  );
};

export default GoToDiscButton;
