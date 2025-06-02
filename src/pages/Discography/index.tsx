import { useEffect, useState } from "react";
/************/
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
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  /************/
  const { guideButton, setGuideButton } = useDiscographyGuideStore();
  /************/
  const othersData: Disk[] = _.filter(
    mockDiskData,
    (data) => data.type !== "album" && data.type !== "ost"
  );
  const ostData = _.filter(mockDiskData, (data) => data.type === "ost");

  useEffect(() => {
    if (guideButton !== isInfoVisible) {
      setGuideButton(isInfoVisible);
    }
  }, [guideButton, isInfoVisible]);

  return (
    <section className="wrapper-full w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner-full flex-grow-0 w-full h-full ">
        {/* 정규 앨범 || 리믹스 앨범*/}
        <AlbumCarousel
          albumMeta={mockDiskData[0]}
          onChange={setIsInfoVisible}
        />
        {/* EP || Single*/}
        <SingleCarousel albumMetas={othersData} onChange={setIsInfoVisible} />
        {/* OST*/}
        <OSTCarousel albumMetas={ostData} onChange={setIsInfoVisible} />
      </div>
    </section>
  );
}
