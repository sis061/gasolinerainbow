import cx from "classnames";
import map from "lodash/map";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { useScrollState } from "@/hooks/useScrollState";
import useLanguageStore from "@/store/useLanguageStore";

const navLinks = [
  // { to: "/", label: "홈" },
  { to: "/about", labelKr: "소개", labelEn: "About" },
  { to: "/discography", labelKr: "디스코그라피", labelEn: "Discography" },
  { to: "/news", labelKr: "소식", labelEn: "News" },
  { to: "/authornote", labelKr: "작가의 말", labelEn: "Notes" },
];

const Nav = ({
  bgBlackRoute,
  pathname,
}: {
  bgBlackRoute: boolean;
  pathname: string;
}) => {
  const minTablet = useMediaQuery({ minWidth: 768 });
  const isScrolled = useScrollState();
  const { language } = useLanguageStore();
  return (
    <ul className="max-md:w-full max-md:justify-between flex items-center justify-start gap-4 xl:gap-6 [&_>li]:flex [&_>li]:justify-center [&_>li]:items-center">
      {map(navLinks, ({ to, labelKr, labelEn }) => (
        <li key={to}>
          <Link
            to={to}
            className={cx(
              "font-extrabold text-lg max-sm:text-sm  hover:opacity-100 transition-all  opacity-65",
              minTablet
                ? (isScrolled || bgBlackRoute) && "!text-white !border-white"
                : "!text-white !border-white",
              // "border-[#1b2838] hover:border-b-1"
              pathname.startsWith(to) && "opacity-100"
            )}
          >
            {language === "ko" ? labelKr : labelEn.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
