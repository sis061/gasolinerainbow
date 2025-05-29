import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="z-[10] w-screen h-20 !mx-auto flex justify-center bg-[#000]">
      <div className="wrapper w-full bg-[#000] relative !p-3 !pt-4">
        <ul className="flex items-center justify-between h-full border-t-1">
          <li>
            <p className="!text-white text-xl">
              H<span className="!text-white text-2xl">í</span>M
              <span className="!text-white text-2xl">í</span>NN
            </p>
          </li>
          <li className="flex items-center justify-center gap-3 h-4 !pt-1">
            <span className="!text-white ">Contact</span>
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
