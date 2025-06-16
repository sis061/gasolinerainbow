import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link as LinkIcon } from "lucide-react";

import map from "lodash/map";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { useScrollState } from "@/hooks/useScrollState";

import BandcampLogo from "@/assets/logos/bandcamp.svg?react";
import ApplemusicLogo from "@/assets/logos/applemusic.svg?react";
import InstagramLogo from "@/assets/logos/instagram.svg?react";
import SoundcloudLogo from "@/assets/logos/soundcloud.svg?react";
import SpotifyLogo from "@/assets/logos/spotify.svg?react";
import YoutubeLogo from "@/assets/logos/youtube.svg?react";
import YoutubeMusicLogo from "@/assets/logos/youtubemusic.svg?react";
import { useState } from "react";

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
  const [open, setOpen] = useState<boolean>(false);
  const minLaptop = useMediaQuery({ minWidth: 1024 });
  const minTablet = useMediaQuery({ minWidth: 768 });
  const isScrolled = useScrollState();

  if (!minTablet) {
    return (
      <>
        <div className="relative overflow-visible">
          <div role="button" id="trigger" onClick={() => setOpen(!open)}>
            <div className="w-8 h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 rounded-full !bg-white cursor-pointer flex items-center justify-center">
              <LinkIcon
                color={"#000"}
                className=" duration-150 max-w-4 max-h-4"
              />
            </div>
          </div>
          {open && (
            <div className="!p-1 absolute left-1/2 -translate-x-1/2 z-[9999] *:!z-[999]">
              {map(logos, ({ Component, name, url }) => (
                <div
                  id="dropdownItem"
                  key={name}
                  className="!p-2 hover:!bg-[#272727] flex items-center justify-center w-12 h-12"
                >
                  <Link
                    to={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full"
                  >
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
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <ul className="flex items-center justify-between gap-4">
        {map(logos, ({ Component, name, url }) => (
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
  }
};

export default SocialButtons;
