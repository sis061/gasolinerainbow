import { commonImages } from "@/assets/images/images";
import useLanguageStore from "@/store/useLanguageStore";
import cx from "classnames";
import { useEffect, useState } from "react";

export default function About() {
  const { language } = useLanguageStore();
  const [pluse, setPulse] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => setPulse("animate-pulse"), 2000);
    return () => clearTimeout(timer);
  }, []);

  const aboutDescription = {
    ko: (
      <>
        안녕하세요, 감히 당신의 우울함을, 외로움을 건드려 보려합니다.
        <br />
        <br />
        주로 아래와 같이 저를 표현합니다 :
        <br />
        <br />
        정형화되지 못한 사운드. 장르 설명하는 것 힘들어하는 편. 보통 여러분의
        부모, 친구, 연인이 질색함. 차가운 노래 위주 (간혹 서정적임). 라디오-비
        친화적.
      </>
    ),
    en: (
      <>
        Hello, I dare to evoke your sadness and loneliness.
        <br />
        <br />
        I usually describe myself like this:
        <br />
        <br />
        Unconventional sounds. I find it hard to label my genre. Usually, your
        parents, friends, and lovers would hate it. Mostly cold songs (sometimes
        tender). Radio-unfriendly.
      </>
    ),
  };
  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full flex items-center justify-center !mb-10 md:!pt-10 max-md:!px-4">
        <ul className="w-full h-auto flex flex-col lg:flex-row items-center gap-6 justify-between max-lg:!pt-6 lg:!pr-6 bg-white/75 shadow-2xl">
          <li className="max-w-1/2 z-10">
            <div className="bg-white/75 !p-1 flex items-center justify-center w-full h-full">
              <img
                src={commonImages.profileImg}
                alt="프로필 이미지"
                className="w-full h-full"
              />
            </div>
          </li>
          <li className="min-w-1/2 h-full flex flex-col gap-8 xl:gap-18 items-center lg:items-start justify-center ">
            <div className="flex flex-col w-full items-center lg:items-start">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl [&_>span]:text-3xl [&_>span]:lg:text-4xl [&_>span]:xl:text-5xl">
                H<span>í</span>M<span>í</span>NN, HIMINN,
              </h1>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl">
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
                  /ˈhɪː.mɪn/
                </a>
              </h1>
            </div>
            <p className="max-lg:!p-6">{aboutDescription[language]}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
