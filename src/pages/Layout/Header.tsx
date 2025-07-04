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

const LogoBg = commonImages.bg01Img;

const Header = () => {
  const [justChanged, setJustChanged] = useState<boolean>(false);

  const minLaptop = useMediaQuery({ minWidth: 1024 });
  const minTablet = useMediaQuery({ minWidth: 768 });

  const { pathname } = useLocation();
  const bgBlackRoute: boolean =
    pathname === "/discography" || pathname.startsWith("/authornote");

  const isScrolled = useScrollState();
  const { language, setLanguage } = useLanguageStore();

  const useWhiteText = isScrolled || bgBlackRoute;

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
          "z-50 w-screen h-16 md:h-24 sticky top-0 flex justify-between items-center gap-2 duration-150",
          "max-sm:!pl-8 max-sm:!pr-4 !px-0 sm:!px-16 md:!px-[3rem] lg:!px-[6rem] xl:!px-[10rem]",
          (isScrolled || bgBlackRoute) &&
            "bg-[#000]/50 backdrop-blur-sm shadow-2xl"
        )}
      >
        <Logo useWhiteText={useWhiteText} />
        {minTablet && (
          <HeaderCenter
            pathname={pathname}
            bgBlackRoute={bgBlackRoute}
            minLaptop={minLaptop}
          />
        )}
        <HeaderRight
          language={language}
          justChanged={justChanged}
          handleChangeLanguage={handleChangeLanguage}
          minTablet={minTablet}
          bgBlackRoute={bgBlackRoute}
        />
      </header>
      {!minLaptop && (
        <MobileBottomNav
          minTablet={minTablet}
          pathname={pathname}
          bgBlackRoute={bgBlackRoute}
        />
      )}
    </>
  );
};

export default Header;

const Logo = ({ useWhiteText }: { useWhiteText: boolean }) => (
  <Link to="/">
    <div className="w-auto min-h-16 flex flex-col items-center justify-center *:transition-all *:duration-300 hover:animate-pulse">
      <p
        style={{
          backgroundImage: useWhiteText ? "" : `url(${LogoBg})`,
        }}
        className={cx(
          "text-lg font-extrabold !-mb-2 !-ml-6",
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
          "text-md font-extrabold !ml-5 [&_>span]:text-xl [&_>span]:font-normal *:transition-all *:duration-300",
          useWhiteText
            ? "!text-white [&_>span]:!text-white"
            : `!bg-clip-text !text-transparent bg-center bg-cover [&_>span]:!bg-clip-text [&_>span]:!text-transparent`
        )}
      >
        SpilledbyH<span>í</span>M<span>í</span>NN
      </p>
    </div>
  </Link>
);

const HeaderCenter = ({
  pathname,
  bgBlackRoute,
  minLaptop,
}: {
  pathname: string;
  bgBlackRoute: boolean;
  minLaptop: boolean;
}) => (
  <>
    <div className="flex gap-2.5 items-center justify-between max-lg:justify-center flex-1 w-full !ml-10">
      <Nav pathname={pathname} bgBlackRoute={bgBlackRoute} />
      {minLaptop && <SocialButtons bgBlackRoute={bgBlackRoute} />}
    </div>
    {minLaptop && (
      <Separator orientation="vertical" className="!h-7 !mx-2 xl:!mx-1.5" />
    )}
  </>
);

const HeaderRight = ({
  language,
  justChanged,
  handleChangeLanguage,
  minTablet,
  bgBlackRoute,
}: {
  language: "ko" | "en";
  justChanged: boolean;
  handleChangeLanguage: () => any;
  minTablet: boolean;
  bgBlackRoute: boolean;
}) => (
  <div className="flex items-center justify-end w-auto gap-3 max-lg:w-[169px]">
    <Button
      variant={"ghost"}
      className="w-8 h-8 lg:w-6 lg:h-6 xl:w-8 xl:h-8 rounded-full !bg-white cursor-pointer relative"
      onClick={handleChangeLanguage}
    >
      <Languages
        size={28}
        color={"#000"}
        className="duration-150 w-full h-full xl:!p-0 max-lg:!p-0 max-xl:!p-[1.5px]"
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
    {!minTablet && <SocialButtons bgBlackRoute={bgBlackRoute} />}
  </div>
);

const MobileBottomNav = ({
  minTablet,
  pathname,
  bgBlackRoute,
}: {
  minTablet: boolean;
  pathname: string;
  bgBlackRoute: boolean;
}) => (
  <nav className="h-16 fixed bottom-0 left-0 flex flex-col md:flex-row items-center justify-around w-screen bg-[#000]/75 backdrop-blur-sm z-[40] shadow-[0_-6px_12px_2px_rgba(0,0,0,0.4)] !px-8 sm:!px-16 md:!px-[3rem] lg:!px-[6rem] *:transition-opacity !p-3">
    {!minTablet ? (
      <Nav pathname={pathname} bgBlackRoute={bgBlackRoute} />
    ) : (
      <SocialButtons bgBlackRoute={bgBlackRoute} />
    )}
  </nav>
);
