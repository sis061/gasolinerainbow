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
    <footer className="z-[10] w-screen min-h-24 !mx-auto flex justify-center bg-[#000]">
      <div className="wrapper w-full bg-[#000] relative !p-3 !pt-4">
        <ul className="flex flex-col items-center justify-around h-full border-t-1 md:flex-row md:justify-between">
          <li>
            <p className="!text-white text-md">
              H<span className="!text-white text-lg">í</span>M
              <span className="!text-white text-lg">í</span>NN
            </p>
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
