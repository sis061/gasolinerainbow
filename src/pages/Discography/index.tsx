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
  const AlbumData = _.filter(
    mockDiskData,
    (data) => data.type === "album" || data.type === "remix"
  );
  const othersData: Disk[] = _.filter(
    mockDiskData,
    (data) => data.type !== "album" && data.type !== "ost"
  );
  const ostData = _.filter(mockDiskData, (data) => data.type === "ost");

  return (
    <section className="wrapper-full w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner-full flex-grow-0 w-full h-full">
        {/* 정규 앨범 || 리믹스 앨범*/}
        {/* 현재는 가장 첫 캐러셀의 상세정보 슬라이드에서만 상세보기 버튼 제공 */}
        {_.map(AlbumData, (album, i) => (
          <AlbumCarousel
            key={i}
            albumMeta={album}
            onChange={i === 0 ? setHasInteractiveTrackList : undefined}
          />
        ))}
        {/* EP || Single*/}
        <SingleCarousel
          albumMetas={othersData}
          // onChange={setHasInteractiveTrackList}
        />
        {/* OST*/}
        <OSTCarousel
          albumMetas={ostData}
          // onChange={setHasInteractiveTrackList}
        />
      </div>
    </section>
  );
}
