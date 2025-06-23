import { useRef, useState } from "react";

import { Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence, easeOut, easeIn } from "framer-motion";

import map from "lodash/map";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import cx from "classnames";

import { useScrollState } from "@/hooks/useScrollState";

import BandcampLogo from "@/assets/logos/bandcamp.svg?react";
import ApplemusicLogo from "@/assets/logos/applemusic.svg?react";
import InstagramLogo from "@/assets/logos/instagram.svg?react";
import SoundcloudLogo from "@/assets/logos/soundcloud.svg?react";
import SpotifyLogo from "@/assets/logos/spotify.svg?react";
import YoutubeLogo from "@/assets/logos/youtube.svg?react";
import YoutubeMusicLogo from "@/assets/logos/youtubemusic.svg?react";

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

const containerVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2, // 전체 컨테이너 속도
      ease: easeOut,
      staggerChildren: 0.02,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.15,
      ease: easeIn,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const SocialButtons = ({ bgBlackRoute }: { bgBlackRoute: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const minLaptop = useMediaQuery({ minWidth: 1024 });
  const minTablet = useMediaQuery({ minWidth: 768 });
  const isScrolled = useScrollState();

  if (!minTablet) {
    return (
      <div ref={dropdownRef} className="relative overflow-visible ">
        <div
          role="button"
          id="trigger"
          onClick={() => setOpen(!open)}
          className={cx(
            "w-8 h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 rounded-full flex items-center justify-center !z-[999] cursor-pointer",
            open ? "!bg-black" : "!bg-white"
          )}
        >
          <LinkIcon
            color={`${open ? "#fff" : "#000"}`}
            className=" duration-150 max-w-4 max-h-4 !z-[999]"
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial="hidden"
              animate={open ? "visible" : "hidden"}
              exit="exit"
              variants={containerVariants}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ pointerEvents: open ? "auto" : "none" }}
              className="fixed left-0 !top-0 w-screen h-screen z-[99] flex flex-col items-end !pr-2 sm:!pr-14 bg-black/65 !pt-16"
              onClick={() => setOpen(false)}
            >
              {logos.map(({ Component, name, url }) => (
                <motion.div
                  key={name}
                  variants={itemVariants}
                  className="!p-2 flex items-center justify-center w-12 h-12 "
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full"
                  >
                    <Component
                      className="w-full h-full duration-150 "
                      // fill={bgBlackRoute ? "#fff" : "#000"}
                      fill={"#fff"}
                    />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
