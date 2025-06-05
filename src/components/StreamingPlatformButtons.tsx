import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
/************/
import mapKeys from "lodash/mapKeys";
import reduce from "lodash/reduce";
import map from "lodash/map";
import cx from "classnames";
/************/
import useLanguageStore from "@/store/useLanguageStore";

import BandcampLogo from "@/assets/logos/bandcamp.svg?react";
import ApplemusicLogo from "@/assets/logos/applemusic.svg?react";
import SpotifyLogo from "@/assets/logos/spotify.svg?react";
import YoutubeMusicLogo from "@/assets/logos/youtubemusic.svg?react";
import BugsLogo from "@/assets/logos/Bugs_BI_wordmark_white.svg?react";
import MelonLogo from "@/assets/logos/melonLogo.svg?react";
import GeniemusicLogo from "@/assets/logos/genie_BI_logotype_white.svg?react";

export interface StreamingPlatformInfoProps {
  labelKr: string;
  labelEn: string;
  color: string;
  url: string;
  Component: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const getStreamingPlatformInfo = (
  urls: Record<string, any>
): StreamingPlatformInfoProps[] => {
  const rawPlatformsData = [
    {
      labelKr: "밴드캠프",
      labelEn: "bandcamp",
      color: "#09a2c8",
      Component: BandcampLogo,
      url: "",
    },
    {
      labelKr: "스포티파이",
      labelEn: "spotify",
      color: "#1DB954",
      Component: SpotifyLogo,
      url: "",
    },
    {
      labelKr: "유튜브 뮤직",
      labelEn: "youtubeMusic",
      color: "#CD201F",
      Component: YoutubeMusicLogo,
      url: "",
    },
    {
      labelKr: "애플 뮤직",
      labelEn: "appleMusic",
      color: "#FA586A",
      Component: ApplemusicLogo,
      url: "",
    },
    {
      labelKr: "멜론",
      labelEn: "melon",
      color: "#00cd3c",
      Component: MelonLogo,
      url: "",
    },
    {
      labelKr: "벅스",
      labelEn: "bugs",
      color: "#FF3B28",
      Component: BugsLogo,
      url: "",
    },
    {
      labelKr: "지니뮤직",
      labelEn: "genie",
      color: "#0096FF",
      Component: GeniemusicLogo,
      url: "",
    },
  ];

  const urlsLowerCase = mapKeys(urls, (_, key) => key.toLowerCase());

  const result = reduce(
    urlsLowerCase,
    (acc: StreamingPlatformInfoProps[], url, key) => {
      const matchedPlatform = rawPlatformsData.find(
        (p) => p.labelEn.toLowerCase() === key
      );
      if (matchedPlatform) {
        acc.push({
          ...matchedPlatform,
          url,
        });
      }
      return acc;
    },
    []
  );
  return result;
};

const StreamingPlatformButtons = ({
  platforms,
  customClassName = "",
}: {
  platforms: StreamingPlatformInfoProps[];
  customClassName?: string;
}) => {
  const { language } = useLanguageStore();
  return (
    <ul
      className={cx(
        "flex flex-wrap gap-3",
        !!customClassName && customClassName
      )}
    >
      {map(platforms, ({ labelKr, labelEn, color, Component, url }) => (
        <li key={labelKr}>
          <Link to={url} target="_blank" rel="noopener noreferrer">
            <Button
              variant="default"
              style={{ backgroundColor: color }}
              className={`w-full min-w-fit !px-3 !py-2 hover:opacity-75 cursor-pointer`}
            >
              <Component fill="#fff" />
              <span
                className={cx(
                  "!text-white text-sm",
                  language === "en" && "text-xs"
                )}
              >
                {language === "ko" ? labelKr : labelEn.toLowerCase()}
              </span>
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StreamingPlatformButtons;
