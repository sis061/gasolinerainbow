import map from "lodash/map";

import useDiscographyGuideStore from "@/store/useDiscographyGuideStore";
import { DiskMetaDatas } from "@/utils/diskMetaDatas";

import AlbumCarousel from "./Album";
import SingleCarousel from "./Single";
import OSTCarousel from "./OST";

export default function Discography() {
  const { setHasInteractiveTrackList } = useDiscographyGuideStore();

  return (
    <section className="wrapper-full w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner-full flex-grow-0 w-full h-full">
        {/* 정규 앨범 || 리믹스 앨범*/}
        {/* 현재는 가장 첫 캐러셀의 상세정보 슬라이드에서만 상세보기 버튼 제공 */}
        {map(DiskMetaDatas.albumMetaDatas, (album, i) => (
          <AlbumCarousel
            key={i}
            albumMeta={album}
            isHoverToolip={i === 0 && true}
            onChange={i === 0 ? setHasInteractiveTrackList : undefined}
          />
        ))}
        {/* EP || Single*/}
        <SingleCarousel
          albumMetas={DiskMetaDatas.othersMetaDatas}
          // onChange={setHasInteractiveTrackList}
        />
        {/* OST*/}
        <OSTCarousel
          albumMetas={DiskMetaDatas.ostMetaDatas}
          // onChange={setHasInteractiveTrackList}
        />
      </div>
    </section>
  );
}
