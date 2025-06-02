import cx from "classnames";
import _ from "lodash";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
/************/
import { useScrollState } from "@/hooks/useScrollState";

const navLinks = [
  // { to: "/", label: "홈" },
  { to: "/profile", label: "소개" },
  { to: "/discography", label: "디스코그라피" },
  { to: "/news", label: "소식" },
  { to: "/authornote", label: "작가의 말" },
];

const Nav = ({
  isDiscography,
  location,
}: {
  isDiscography: boolean;
  location: any;
}) => {
  const minTablet = useMediaQuery({ minWidth: 768 });
  const isScrolled = useScrollState();

  return (
    <ul className="max-md:w-full max-md:justify-between flex items-center justify-start gap-4 xl:gap-6 [&_>li]:flex [&_>li]:justify-center [&_>li]:items-center">
      {_.map(navLinks, ({ to, label }) => (
        <li key={to}>
          <Link
            to={to}
            className={cx(
              "font-extrabold text-lg max-sm:text-sm hover:border-b-1 hover:opacity-100 transition-all border-[#1b2838] opacity-70",
              minTablet
                ? (isScrolled || isDiscography) && "!text-white !border-white"
                : "!text-white !border-white",
              location?.pathname.startsWith(to) && "opacity-100"
            )}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
