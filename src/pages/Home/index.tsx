import _ from "lodash";
/************/
import { mockDiskData } from "@/utils/mockDiskData";
import HomeAlbumOverview from "./components/HomeAlbumOverview";
import HomeCountDown from "./components/HomeCountDown";

export default function Home() {
  const releaseDate = new Date("2025-07-03T12:00:00");
  const HMVideoId: string = "q0RXd1Tj7tk";
  const BIPVideoId: string = "q0RXd1Tj7tk";

  const [HMData] = _.filter(
    mockDiskData,
    (data) => data.title.toLowerCase() === "Hm".toLowerCase()
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
