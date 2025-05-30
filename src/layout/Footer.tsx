import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail, Send } from "lucide-react";

const Footer = () => {
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
                SpilledByH<span>í</span>M<span>í</span>NN
              </p>
            </div>
          </li>
          <li className="flex items-center justify-center gap-3 h-4 !pt-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="!text-white cursor-pointer hover:border-b-1 border-white">
                  Contact
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black !p-1">
                <DropdownMenuItem className="!p-2 hover:!bg-[#272727]">
                  <Mail color="white" />
                  <span className="!text-white">이메일</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="!p-2 hover:!bg-[#272727]">
                  <Send color="white" />
                  <span className="!text-white">인스타그램 DM</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" />
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

/*
뭐 집어넣나
contact : 이메일 인스타그램 디엠
저작권 표기 c 2025 HIMINN
*/
