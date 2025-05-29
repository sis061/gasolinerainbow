import { useState, useEffect } from "react";

import BandcampLogo from "@/assets/logos/bandcamp.svg?react";
import ApplemusicLogo from "@/assets/logos/applemusic.svg?react";
import InstagramLogo from "@/assets/logos/instagram.svg?react";
import SoundcloudLogo from "@/assets/logos/soundcloud.svg?react";
import SpotifyLogo from "@/assets/logos/spotify.svg?react";
import YoutubeLogo from "@/assets/logos/youtube.svg?react";
import YoutubeMusicLogo from "@/assets/logos/youtubemusic.svg?react";

import cx from "classnames";
import { Link } from "react-router-dom";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={cx(
          "z-50 w-screen min-h-32 !px-[10rem] sticky top-0 overflow-hidden lg:px-10 lg:h-24 flex justify-between items-center gap-10 duration-150",
          isScrolled && "bg-[#1b2838]/50 backdrop-blur-sm shadow-2xl"
        )}
      >
        <div className="overflow-hidden flex-grow-0">
          <Link to="/">
            <div className="w-auto min-h-16 flex flex-col items-center justify-center">
              <p
                className={cx(
                  "text-lg font-extrabold !-mb-2 !mr-11 ",
                  isScrolled
                    ? "!text-white"
                    : "!bg-clip-text !text-transparent bg-[url('@/assets/images/bg01Img.PNG')] bg-center bg-cover"
                )}
              >
                GasolineRainbow
              </p>
              <p
                className={cx(
                  "text-md font-extrabold  [&_>span]:text-xl [&_>span]:font-normal ",
                  isScrolled
                    ? "!text-white [&_>span]:!text-white"
                    : "!bg-clip-text !text-transparent bg-[url('@/assets/images/bg01Img.PNG')] bg-center bg-cover [&_>span]:!bg-clip-text [&_>span]:!text-transparent"
                )}
              >
                SpilledByH<span>í</span>M<span>í</span>NN
              </p>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-between flex-grow">
          <ul className="flex gap-5 [&_>li]:!p-3 [&_>li]:flex [&_>li]:justify-center [&_>li]:items-center">
            <li>
              <Link
                to="/"
                className={cx(
                  "font-extrabold text-lg hover:border-b-1 transition-all duration-100 border-[#1b2838]",
                  isScrolled && "!text-white !border-white duration-150"
                )}
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="font-extrabold text-lg hover:border-b-1 transition-all duration-100 border-[#1b2838]"
              >
                소개
              </Link>
            </li>
            <li>
              <Link
                to="discography"
                className="font-extrabold text-lg hover:border-b-1 transition-all duration-100 border-[#1b2838]"
              >
                디스코그라피
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className="font-extrabold text-lg hover:border-b-1 transition-all duration-100 border-[#1b2838]"
              >
                소식
              </Link>
            </li>
            <li>
              <Link
                to="/authornote"
                className="font-extrabold text-lg hover:border-b-1 transition-all duration-100 border-[#1b2838]"
              >
                작가의 말
              </Link>
            </li>
          </ul>
          <div className="flex flex-grow-0 items-center justify-start gap-10 h-full">
            <div className="flex items-center justify-between border-r-1 border-[#f9f9f9] !pr-5">
              <Button
                variant={"ghost"}
                className={cx(
                  " min-w-8 min-h-6 max-w-9 max-h-8 rounded-full bg-white",
                  isScrolled && "bg-black"
                )}
              >
                <Languages
                  size={28}
                  color={isScrolled ? "#fff" : "#000"}
                  className="duration-150"
                />
              </Button>
            </div>
            <ul className="!-ml-5 flex-grow flex items-center justify-between gap-6 [&_>li]:max-w-8 [&_>li]:max-h-8 [&_>li]:min-w-6 [&_>li]:min-h-6 [&_>li]:flex [&_>li]:items-center [&_>li]:justify-center">
              <li>
                <SpotifyLogo
                  className="w-full h-full duration-150"
                  fill={cx(isScrolled && "#fff")}
                />
              </li>
              <li>
                <YoutubeMusicLogo className="w-full h-full" />
              </li>
              <li>
                <ApplemusicLogo className="w-full h-full" />
              </li>
              <li>
                <BandcampLogo className="w-full h-full" />
              </li>
              <li>
                <SoundcloudLogo className="w-full h-full" />
              </li>
              <li>
                <InstagramLogo className="w-full h-full" />
              </li>
              <li>
                <YoutubeLogo className="w-full h-full" />
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

//  스포티파이, 유튜브뮤직, 애플뮤직, 밴캠, 사클, 인스타, 유튜브
