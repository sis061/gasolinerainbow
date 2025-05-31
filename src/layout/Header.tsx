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
import _ from "lodash";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "react-responsive";
import { useScrollState } from "@/hooks/useScrollState";

const navLinks = [
  { to: "/", label: "홈" },
  { to: "/profile", label: "소개" },
  { to: "/discography", label: "디스코그라피" },
  { to: "/news", label: "소식" },
  { to: "/authornote", label: "작가의 말" },
];

const logos = [
  { Component: SpotifyLogo, name: "spotify" },
  { Component: YoutubeMusicLogo, name: "ytmusic" },
  { Component: ApplemusicLogo, name: "applemusic" },
  { Component: BandcampLogo, name: "bandcamp" },
  { Component: SoundcloudLogo, name: "soundcloud" },
  { Component: InstagramLogo, name: "instagram" },
  { Component: YoutubeLogo, name: "youtube" },
];

const Header = () => {
  const isScrolled = useScrollState();
  const minLaptop = useMediaQuery({ minWidth: 1024 });
  const minTablet = useMediaQuery({ minWidth: 768 });
  return (
    <>
      <header
        className={cx(
          "z-50 w-screen h-32 max-lg:h-24 !px-8 sm:!px-16 md:!px-[3rem] lg:!px-[6rem] xl:!px-[10rem] sticky top-0 overflow-hidden flex justify-between items-center gap-2 duration-150",
          isScrolled && "bg-[#000]/50 backdrop-blur-sm shadow-2xl"
        )}
      >
        {/* LOGO */}
        <Link to="/">
          <div className="w-auto min-h-16 flex flex-col items-center justify-center *:transition-all *:duration-150">
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

        {minTablet && (
          <>
            <div className="flex gap-2.5 items-center justify-between max-lg:justify-center flex-1 w-full">
              {/* NAV */}
              <Nav />
              {/* Social */}
              {minLaptop && <SocialMedia />}
            </div>
            {minLaptop && (
              <Separator
                orientation="vertical"
                className="!h-7 !mx-2 xl:!mx-1.5"
              />
            )}
          </>
        )}
        {/* LANG */}
        <div className="flex items-center justify-end max-lg:w-[169px] ">
          <Button
            variant={"ghost"}
            className={cx(
              "w-6 h-6 xl:w-8 xl:h-8 rounded-full bg-white",
              isScrolled && "bg-black"
            )}
          >
            <Languages
              size={28}
              color={isScrolled ? "#fff" : "#000"}
              className="duration-150 w-full h-full"
            />
          </Button>
        </div>
      </header>
      {!minLaptop && (
        <nav className="h-32 md:h-16 !px-8 sm:!px-16 md:!px-[3rem] lg:!px-[6rem] fixed bottom-0 left-0 flex flex-col md:flex-row items-center justify-around w-screen !p-3 bg-[#000]/75 backdrop-blur-sm *:transition-opacity z-[50] shadow-[0_-6px_12px_2px_rgba(0,0,0,0.4)]">
          {/* NAV */}
          {!minTablet && <Nav />}
          {/* Social */}
          <SocialMedia />
        </nav>
      )}
    </>
  );
};

export default Header;

const Nav = () => {
  const minTablet = useMediaQuery({ minWidth: 768 });
  const isScrolled = useScrollState();

  return (
    <ul className="max-md:w-full max-md:justify-between flex items-center justify-start gap-4 xl:gap-6 [&_>li]:flex [&_>li]:justify-center [&_>li]:items-center">
      {_.map(navLinks, ({ to, label }) => (
        <li key={to}>
          <Link
            to={to}
            className={cx(
              "font-extrabold text-lg [@media(max-width:365px)]:text-sm hover:border-b-1 transition-all border-[#1b2838]",
              minTablet
                ? isScrolled && "!text-white !border-white"
                : "!text-white !border-white"
            )}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const SocialMedia = () => {
  const minLaptop = useMediaQuery({ minWidth: 1024 });
  const isScrolled = useScrollState();

  return (
    <ul className="flex items-center justify-between gap-4">
      {_.map(logos, ({ Component, name }) => (
        <li
          key={name}
          className="flex items-center justify-center w-6 h-6 xl:w-8 xl:h-8"
        >
          <Component
            className="w-full h-full duration-150"
            fill={minLaptop ? (isScrolled ? "#fff" : "#000") : "#fff"}
          />
        </li>
      ))}
    </ul>
  );
};
