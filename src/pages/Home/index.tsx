import filter from "lodash/filter";

import { DiskMetaDatas } from "@/utils/diskMetaDatas";
import HomeAlbumOverview from "./components/HomeAlbumOverview";
import HomeCountDown from "./components/HomeCountDown";

export default function Home() {
  const RELEASE_DATE = new Date("2025-07-23T12:00:00");

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

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full h-full !mb-10 !pt-4 md:!pt-10 max-md:!px-4 !space-y-20">
        <HomeCountDown
          releaseDate={RELEASE_DATE}
          albumMeta={BIPData}
          videoId={BIPVideoId}
        />
        <HomeAlbumOverview
          isVideoRight={false}
          videoId={HMVideoId}
          albumMeta={HMData}
        />
      </div>
    </section>
  );
}
