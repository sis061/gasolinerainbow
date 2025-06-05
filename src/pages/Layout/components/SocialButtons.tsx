import _ from "lodash";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
/************/
import { useScrollState } from "@/hooks/useScrollState";

/************/
import BandcampLogo from "@/assets/logos/bandcamp.svg?react";
import ApplemusicLogo from "@/assets/logos/applemusic.svg?react";
import InstagramLogo from "@/assets/logos/instagram.svg?react";
import SoundcloudLogo from "@/assets/logos/soundcloud.svg?react";
import SpotifyLogo from "@/assets/logos/spotify.svg?react";
import YoutubeLogo from "@/assets/logos/youtube.svg?react";
import YoutubeMusicLogo from "@/assets/logos/youtubemusic.svg?react";

/************/
const logos = [
  {
    Component: SpotifyLogo,
    name: "spotify",
    url: "https://open.spotify.com/artist/1XqMSGUousXQqLMInUtVxv?si=u_ybEcAXTwGOUt8-_wjwBQ",
  },
  {
    Component: YoutubeMusicLogo,
    name: "ytmusic",
    url: "https://music.youtube.com/channel/UCCsxnJIDEJIMcE4Tzb8fwyw",
  },
  {
    Component: ApplemusicLogo,
    name: "applemusic",
    url: "https://music.apple.com/us/artist/himinn/1568514667",
  },
  {
    Component: BandcampLogo,
    name: "bandcamp",
    url: "https://himinnn.bandcamp.com/",
  },
  {
    Component: SoundcloudLogo,
    name: "soundcloud",
    url: "https://soundcloud.com/himinnn",
  },
  {
    Component: InstagramLogo,
    name: "instagram",
    url: "https://www.instagram.com/himinn___/",
  },
  {
    Component: YoutubeLogo,
    name: "youtube",
    url: "https://www.youtube.com/channel/UCTcqZG9Q8AbpjbsP-mgzypQ",
  },
];

const SocialButtons = ({ bgBlackRoute }: { bgBlackRoute: boolean }) => {
  const minLaptop = useMediaQuery({ minWidth: 1024 });
  const isScrolled = useScrollState();

  return (
    <ul className="flex items-center justify-between gap-4">
      {_.map(logos, ({ Component, name, url }) => (
        <li
          key={name}
          className="flex items-center justify-center w-6 h-6 xl:w-8 xl:h-8"
        >
          <Link to={url} target="_blank" rel="noopener noreferrer">
            <Component
              className="w-full h-full duration-150"
              fill={
                minLaptop
                  ? isScrolled || bgBlackRoute
                    ? "#fff"
                    : "#000"
                  : "#fff"
              }
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialButtons;
