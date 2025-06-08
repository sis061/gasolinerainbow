import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Languages } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import cx from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Nav from "./components/Nav";
import SocialButtons from "./components/SocialButtons";
import { commonImages } from "@/assets/images/images";
import { useScrollState } from "@/hooks/useScrollState";
import useLanguageStore from "@/store/useLanguageStore";

const Header = () => {
  const [justChanged, setJustChanged] = useState(false);

  const minLaptop = useMediaQuery({ minWidth: 1024 });
  const minTablet = useMediaQuery({ minWidth: 768 });
  const { pathname } = useLocation();
  const bgBlackRoute: boolean =
    pathname === "/discography" || pathname.startsWith("/authornote");

  const isScrolled = useScrollState();
  const { language, setLanguage } = useLanguageStore();

  const useWhiteText = isScrolled || bgBlackRoute;

  const LogoBg = commonImages.bg01Img;

  const handleChangeLanguage = () => {
    const newLang = language === "ko" ? "en" : "ko";
    setLanguage(newLang);
    setJustChanged(true);
    setTimeout(() => setJustChanged(false), 500);
  };

  return (
    <>
      <header
        className={cx(
          "z-50 w-screen h-16 md:h-24 !px-8 sm:!px-16 md:!px-[3rem] lg:!px-[6rem] xl:!px-[10rem] sticky top-0 overflow-hidden flex justify-between items-center gap-2 duration-150",
          (isScrolled || bgBlackRoute) &&
            "bg-[#000]/50 backdrop-blur-sm shadow-2xl"
        )}
      >
        {/* LOGO */}
        <Link to="/">
          <div className="w-auto min-h-16 flex flex-col items-center justify-center *:transition-all *:duration-300 hover:animate-pulse">
            <p
              style={{
                backgroundImage: useWhiteText ? "" : `url(${LogoBg})`,
              }}
              className={cx(
                "text-lg font-extrabold !-mb-2 !mr-11 ",
                useWhiteText
                  ? "!text-white"
                  : `!bg-clip-text !text-transparent bg-center bg-cover`
              )}
            >
              GasolineRainbow
            </p>
            <p
              style={{
                backgroundImage: useWhiteText ? "" : `url(${LogoBg})`,
              }}
              className={cx(
                "text-md font-extrabold  [&_>span]:text-xl [&_>span]:font-normal *:transition-all *:duration-300",
                useWhiteText
                  ? "!text-white [&_>span]:!text-white"
                  : `!bg-clip-text !text-transparent bg-center bg-cover [&_>span]:!bg-clip-text [&_>span]:!text-transparent`
              )}
            >
              SpilledbyH<span>í</span>M<span>í</span>NN
            </p>
          </div>
        </Link>
        {minTablet && (
          <>
            <div className="flex gap-2.5 items-center justify-between max-lg:justify-center flex-1 w-full">
              {/* NAV */}
              <Nav bgBlackRoute={bgBlackRoute} pathname={pathname} />
              {/* Social */}
              {minLaptop && <SocialButtons bgBlackRoute={bgBlackRoute} />}
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
              "w-8 h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 rounded-full !bg-white cursor-pointer relative"
              // (isScrolled || bgBlackRoute) && "bg-black"
            )}
            onClick={handleChangeLanguage}
          >
            <Languages
              size={28}
              // color={isScrolled || bgBlackRoute ? "#fff" : "#000"}
              color={"#000"}
              className="duration-150 w-full h-full"
            />
            <motion.div
              initial={false}
              whileHover={{ opacity: 1 }}
              style={{ opacity: justChanged ? 0 : 0 }}
              className="absolute flex items-center justify-center bg-black w-full h-full rounded-full"
            >
              <span className="font-bold !text-white">
                {language === "ko" ? "한" : "A"}
              </span>
            </motion.div>
            <AnimatePresence>
              {justChanged && (
                <motion.div
                  key="clicked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute flex items-center justify-center bg-black w-full h-full rounded-full"
                >
                  <span className="font-bold !text-white">
                    {language === "ko" ? "한" : "A"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </header>
      {!minLaptop && (
        <nav className="h-28 md:h-16 !px-8 sm:!px-16 md:!px-[3rem] lg:!px-[6rem] fixed bottom-0 left-0 flex flex-col md:flex-row items-center justify-around w-screen !p-3 bg-[#000]/75 backdrop-blur-sm *:transition-opacity z-[50] shadow-[0_-6px_12px_2px_rgba(0,0,0,0.4)]">
          {/* NAV */}
          {!minTablet && (
            <Nav bgBlackRoute={bgBlackRoute} pathname={pathname} />
          )}
          {/* Social */}
          <SocialButtons bgBlackRoute={bgBlackRoute} />
        </nav>
      )}
    </>
  );
};

export default Header;
