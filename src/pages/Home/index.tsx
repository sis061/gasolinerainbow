import filter from "lodash/filter";

import { DiskMetaDatas } from "@/utils/diskMetaDatas";
import HomeAlbumOverview from "./components/HomeAlbumOverview";
import HomeCountDown from "./components/HomeCountDown";

export default function Home() {
  // TODO: feature/1st_patch :: 발매 일자 나오면 수정하기

  const RELEASE_DATE = new Date("2025-07-18T12:00:00");
  //const RELEASE_DATE = new Date(Date.now() + 10000);
  

  const HMVideoId: string = "q0RXd1Tj7tk";

  // // TODO: 앨범 발매 전 유튜브 업로드 하고 아이디 string 바꾸기
  const BIPVideoId: string = "q0RXd1Tj7tk";

  const [HMData] = filter(
    DiskMetaDatas.albumMetaDatas,
    (data) => data.titleKr.toLowerCase() === "Hm".toLowerCase()
  );

  const [BIPData] = filter(
    DiskMetaDatas.albumMetaDatas,
    (data) => data.titleKr.toLowerCase() === "평화로운 뇌와…".toLowerCase()
  );

  //상세보기 버튼 클릭 시 디스코그라피 > 해당 앨범 > 상세정보 슬라이드로 이동하기 위한 좌표
  const TARGET_CAROUSEL = { carouselIndex: 0, slideIndex: 1 };

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full h-full !mb-10 !pt-4 md:!pt-10 max-md:!px-4 !space-y-10">
        <HomeCountDown
          releaseDate={RELEASE_DATE}
          albumMeta={BIPData}
          videoId={BIPVideoId}
        />
        <HomeAlbumOverview
          videoId={HMVideoId}
          albumMeta={HMData}
          targetCarousel={TARGET_CAROUSEL}
        />
      </div>
    </section>
  );
}
