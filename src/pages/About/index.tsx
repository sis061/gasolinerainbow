import { useEffect, useState } from "react";
import cx from "classnames";
import { commonImages } from "@/assets/images/images";
import useLanguageStore from "@/store/useLanguageStore";
import { Skeleton } from "@/components/ui/skeleton";

const About = () => {
  const { language } = useLanguageStore();
  const [pluse, setPulse] = useState<string>("");
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setPulse("animate-pulse"), 2000);
    return () => clearTimeout(timer);
  }, []);

  const aboutDescription = {
    ko: (
      <>
        안녕하세요.
        <br />
        HIMINN은 주로 아래와 같이 표현됩니다 :
        <br />
        <br />
        정형화되지 못한 사운드. 장르 설명하는 걸 힘들어하는 편. 보통 여러분의
        부모, 친구, 연인이 질색함. 차가운 노래 위주 (간혹 서정적임).
        라디오-비친화적.
      </>
    ),
    en: (
      <>
        Hello.
        <br />
        HIMINN is usually described as :
        <br />
        <br />
        Unconventional sounds. I find it hard to label my genre. Usually, your
        parents, friends, and lovers would hate it. Mostly cold songs (sometimes
        tender). Radio-unfriendly.
      </>
    ),
  };
  return (
    <section className="wrapper w-full min-h-[calc(100dvh-12rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full flex items-center justify-center !mb-10 !mt-2 max-md:!px-4">
        <ul className="w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-0 justify-center max-lg:!pt-6 bg-white/75 lg:bg-transparent shadow-2xl lg:shadow-none">
          <li className="w-1/3 z-10 relative !aspect-square lg:!mb-36 lg:!-mr-48">
            <div className="bg-white/25 lg:bg-white/75 !p-1 flex items-center justify-center w-full h-full absolute inset-0">
              {!isImageLoaded && (
                <Skeleton className="w-full h-full rounded-none bg-[#333]" />
              )}
              <img
                src={commonImages.profileImg}
                alt="프로필 이미지"
                className={cx(
                  "absolute inset-1.5 w-full h-full object-cover transition-opacity duration-500 !shadow-2xl",
                  isImageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIsImageLoaded(true)}
                loading="eager"
              />
            </div>
          </li>
          <li className="min-w-1/2 max-w-3/4 flex flex-col lg:gap-12 items-center lg:items-start justify-center lg:bg-white/75 max-lg:!pt-3 lg:!p-6 lg:!mt-48 lg:!pl-12">
            <div className="flex flex-col w-full items-center lg:items-start lg:!ml-48">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl [&_>span]:font-light [&_>span]:text-3xl [&_>span]:lg:text-4xl [&_>span]:xl:text-5xl text-center">
                H<span>í</span>M<span>í</span>NN, HIMINN,
              </h1>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl text-center lg:!pl-2">
                himinn,{" "}
                <a
                  href="https://youtu.be/YVEo4jbA9QA?si=UvXN6osKgW3nHsyR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    "hover:!text-white transition-all duration-150",
                    pluse
                  )}
                >
                  /'hɪː.mɪn/
                </a>
              </h1>
            </div>
            <p className="max-lg:!py-6 max-lg:!-mx-3">
              {aboutDescription[language]}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
