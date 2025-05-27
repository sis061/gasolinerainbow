const Footer = () => {
  return (
    <footer className="bg-gray-100 w-full h-full relative z-[10] min-h-40 [&>*]:!text-white mx-auto">
      <div className="wrapper flex items-center w-full h-full justify-center">
        <ul className="bg-orange-50 inner breakpoint w-full min-h-40 h-full !p-3 max-w-2/3 flex flex-col flex-grow-0 justify-between items-center gap-6">
          <li>
            <ol className="grid grid-cols-2 grid-rows-2 gap-3">
              <li className="row-span-2">Contact Me</li>
              <li>himinnjeong@gmail.com</li>
              <li>인스타그램 DM</li>
            </ol>
          </li>
          <li>
            <p className="font-light text-xs">
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
