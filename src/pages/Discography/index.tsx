import React, { useEffect, useRef, useState } from "react";

import { PuffLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import cx from "classnames";

import useDiscographyStore from "@/store/useDiscographyStore";
import { DiskMetaDatas } from "@/utils/diskMetaDatas";

import AlbumCarousel from "./Album";
import SingleCarousel from "./Single";
import OSTCarousel from "./OST";

import type { TargetCarouselProps } from "@/types/discography";

export default function Discography() {
  const carouselRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [carouselReady, setCarouselReady] = useState(false);

  const location = useLocation();
  const state = location?.state as TargetCarouselProps | undefined;
  const targetCarouselIndex = state?.carouselIndex ?? -1;
  const targetSlideIndex = state?.slideIndex ?? 0;

  const minTablet = useMediaQuery({ minWidth: 768 });
  const { setHasInteractiveTrackList, GoToDiscActive } = useDiscographyStore();

  const carousels = [
    ...DiskMetaDatas.albumMetaDatas.map((albumMeta, i) => ({
      key: `album-${i}`,
      component: (
        <AlbumCarousel
          albumMeta={albumMeta}
          isHoverToolip={i === 0}
          onChange={i === 0 ? setHasInteractiveTrackList : undefined}
        />
      ),
    })),
    {
      key: "single",
      component: <SingleCarousel albumMetas={DiskMetaDatas.othersMetaDatas} />,
    },
    {
      key: "ost",
      component: <OSTCarousel albumMetas={DiskMetaDatas.ostMetaDatas} />,
    },
  ];

  useEffect(() => {
    const targetEl = carouselRefs.current[targetCarouselIndex];

    if (targetCarouselIndex === -1 || !targetEl) {
      setCarouselReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCarouselReady(true);
          observer.disconnect();
        }
      },
      {
        root: null, // viewport
        threshold: 0.75,
      }
    );

    observer.observe(targetEl);
    targetEl.scrollIntoView({ behavior: "smooth", block: "center" });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={cx(
        "wrapper-full w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center",
        GoToDiscActive && "cursor-progress"
      )}
    >
      {GoToDiscActive ? (
        <div className="inner-full fixed top-16 md:top-24 w-full h-[calc(100dvh-6rem)] z-10 !p-4">
          <PuffLoader
            size={minTablet ? 45 : 30}
            color="#eab308bf"
            speedMultiplier={2}
          />
        </div>
      ) : (
        <></>
      )}
      <ul className="inner-full flex-grow-0 w-full h-full">
        {/* 정규 앨범 || 리믹스 앨범*/}
        {/* 현재는 가장 첫 캐러셀의 상세정보 슬라이드에서만 상세보기 버튼 제공 */}
        {carousels.map((carousel, i) => (
          <li
            key={carousel.key}
            ref={(el) => {
              carouselRefs.current[i] = el;
            }}
          >
            {/* 선택된 캐러셀이면 prop으로 index 전달 */}
            {React.cloneElement(carousel.component, {
              ...(i === targetCarouselIndex
                ? { initialSlideIndex: targetSlideIndex, ready: carouselReady }
                : {}),
            })}
          </li>
        ))}
      </ul>
    </section>
  );
}
