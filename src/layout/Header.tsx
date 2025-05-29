import { Link } from "react-router-dom";

import BandcampLogo from "@/assets/logos/bandcamp.svg?react";
import ApplemusicLogo from "@/assets/logos/applemusic.svg?react";
import InstagramLogo from "@/assets/logos/instagram.svg?react";
import SoundcloudLogo from "@/assets/logos/soundcloud.svg?react";
import SpotifyLogo from "@/assets/logos/spotify.svg?react";
import YoutubeLogo from "@/assets/logos/youtube.svg?react";
import YoutubeMusicLogo from "@/assets/logos/youtubemusic.svg?react";

const Header = () => {
  return (
    <>
      <header className="bg-accent z-50 w-screen min-h-32 !px-[10rem] sticky top-0 overflow-hidden duration-200 lg:px-10 lg:h-24 flex justify-between items-center gap-10">
        <div className="overflow-hidden flex-grow-0">
          <Link to="/">
            <img
              src=""
              alt="로고"
              className="w-20 h-20 border-1 border-black"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between flex-grow">
          <ul className="flex gap-5 [&_>li]:border-1 [&_>li]:!p-3 [&_>li]:flex [&_>li]:justify-center [&_>li]:items-center">
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/profile">소개</Link>
            </li>
            <li>
              <Link to="discography">디스코그라피</Link>
            </li>
            <li>
              <Link to="/news">소식</Link>
            </li>
            <li>
              <Link to="/authornote">작가의 말</Link>
            </li>
          </ul>
          <div className="flex items-center gap-10">
            <div>한/영</div>
            <ul className="flex items-center justify-between gap-6 [&_>li]:max-w-8 [&_>li]:max-h-8 [&_>li]:min-w-6 [&_>li]:min-h-6 [&_>li]:flex [&_>li]:items-center [&_>li]:justify-center">
              <li>
                <SpotifyLogo className="w-full h-full" />
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
