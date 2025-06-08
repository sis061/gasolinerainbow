import filter from "lodash/filter";

import { DiskMetaDatas } from "@/utils/diskMetaDatas";
import HomeAlbumOverview from "./components/HomeAlbumOverview";
import HomeCountDown from "./components/HomeCountDown";

export default function Home() {
  const releaseDate = new Date("2025-06-25T12:00:00");
  // const releaseDate = new Date(Date.now() + 10000);
  const HMVideoId: string = "q0RXd1Tj7tk";
  const BIPVideoId: string = "q0RXd1Tj7tk";

  const [HMData] = filter(
    DiskMetaDatas.albumMetaDatas,
    (data) => data.titleKr.toLowerCase() === "Hm".toLowerCase()
  );

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full h-full !mb-10 md:!pt-10 max-md:!px-4 !space-y-10">
        <HomeCountDown
          releaseDate={releaseDate}
          albumMeta={HMData}
          videoId={BIPVideoId}
        />
        <HomeAlbumOverview videoId={HMVideoId} albumMeta={HMData} />
      </div>
    </section>
  );
}
