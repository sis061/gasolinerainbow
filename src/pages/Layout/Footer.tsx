import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail, Send } from "lucide-react";

import useLanguageStore from "@/store/useLanguageStore";

const Footer = () => {
  const { language } = useLanguageStore();
  return (
    <footer className="z-[10] w-screen !px-3 md:!px-[2.25rem] max-md:!pb-32 max-lg:!pb-16 min-h-32 md:min-h-24 !mx-auto flex justify-center bg-[#000] !shadow-2xl">
      <div className="wrapper w-full relative !p-3 !pt-4">
        <ul className="flex flex-col items-center justify-around h-full border-t-1 md:flex-row md:justify-between">
          <li>
            <div className="w-auto min-h-16 flex flex-col items-center justify-center md:items-start">
              <p className="text-lg font-extrabold !-mb-2 !text-white">
                GasolineRainbow
              </p>
              <p className="text-md font-extrabold  [&_>span]:text-xl [&_>span]:font-normal !text-white [&_>span]:!text-white">
                SpilledbyH<span>í</span>M<span>í</span>NN
              </p>
            </div>
          </li>
          <li className="flex items-center justify-center gap-3 h-4 !pt-1 [@media(max-width:365px)]:text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span
                  role="button"
                  className="!text-white cursor-pointer hover:border-b-1 border-white"
                >
                  Contact
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="bg-black !p-1">
                <DropdownMenuItem className="!p-2 hover:!bg-[#272727]">
                  <a
                    href="mailto:himinnjeong@gmail.com"
                    className="flex items-center justify-start gap-2 w-full"
                  >
                    <Mail color="white" />
                    <span className="!text-white">
                      {language === "ko" ? "이메일" : "Mail"}
                    </span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="!p-2 hover:!bg-[#272727]">
                  <a
                    href="https://www.instagram.com/himinn___/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-start gap-2 w-full"
                  >
                    <Send color="white" />
                    <span className="!text-white">
                      {language === "ko" ? "인스타그램" : "Instagram"} DM
                    </span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator
              orientation="vertical"
              className="[@media(max-width:365px)]:hidden"
            />
            <p className="text-sm  !text-white">
              &copy; 2025 HIMINN&#46; All Rights Reserved&#46;
            </p>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
