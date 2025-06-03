import _ from "lodash";
/************/
import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";
import { mockDiskData } from "@/utils/mockDiskData";
/************/
import AlbumCarousel from "./Album";
import SingleCarousel from "./Single";
import OSTCarousel from "./OST";
/************/
import type { Disk } from "@/types/discography";

export default function Discography() {
  const { setHasInteractiveTrackList } = useDiscographyGuideStore();
  /************/
  const othersData: Disk[] = _.filter(
    mockDiskData,
    (data) => data.type !== "album" && data.type !== "ost"
  );
  const ostData = _.filter(mockDiskData, (data) => data.type === "ost");

  return (
    <section className="wrapper-full w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner-full flex-grow-0 w-full h-full ">
        {/* 정규 앨범 || 리믹스 앨범*/}
        <AlbumCarousel
          albumMeta={mockDiskData[0]}
          onChange={setHasInteractiveTrackList}
        />
        {/* EP || Single*/}
        <SingleCarousel
          albumMetas={othersData}
          onChange={setHasInteractiveTrackList}
        />
        {/* OST*/}
        <OSTCarousel
          albumMetas={ostData}
          onChange={setHasInteractiveTrackList}
        />
      </div>
    </section>
  );
}
