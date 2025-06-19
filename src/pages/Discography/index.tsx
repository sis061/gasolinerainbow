import React, { useEffect, useRef, useState } from "react";

import { useLocation } from "react-router-dom";

import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";
import { DiskMetaDatas } from "@/utils/diskMetaDatas";

import AlbumCarousel from "./Album";
import SingleCarousel from "./Single";
import OSTCarousel from "./OST";

import type { TargetCarouselProps } from "@/types/home";

export default function Discography() {
  const { setHasInteractiveTrackList } = useDiscographyGuideStore();
  const carouselRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [carouselReady, setCarouselReady] = useState(false);

  const location = useLocation();
  const state = location?.state as TargetCarouselProps | undefined;
  const targetCarouselIndex = state?.carouselIndex ?? 0;
  const targetSlideIndex = state?.slideIndex ?? 0;

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
    const timeout = setTimeout(() => {
      const targetEl = carouselRefs.current[targetCarouselIndex];
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // scrollIntoView 이후 슬라이드 인덱스 이동 허용
      setTimeout(() => {
        setCarouselReady(true);
      }, 650); // 애니메이션 시간에 따라 조정
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="wrapper-full w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center ">
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
