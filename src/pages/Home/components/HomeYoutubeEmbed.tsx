import { useState } from "react";

import { ScaleLoader } from "react-spinners";
import YouTube from "react-youtube";

const HomeYoutubeEmbed = ({
  id = "q0RXd1Tj7tk",
  img,
}: {
  id: string;
  img: string;
}) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  return (
    <>
      {!isReady && (
        <div
          style={{ backgroundImage: `url(${img})` }}
          className={`w-full h-full flex items-center justify-center bg-contain bg-no-repeat bg-center opacity-50`}
        >
          <ScaleLoader barCount={5} color="#666" margin={5} />
        </div>
      )}
      <YouTube
        videoId={id}
        loading="eager"
        onReady={() => setIsReady(true)}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0, //자동재생 O
            rel: 0, //관련 동영상 표시하지 않음
            modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
          },
        }}
      />
    </>
  );
};

export default HomeYoutubeEmbed;
