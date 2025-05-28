const Footer = () => {
  return (
    <footer className="min-h-40 z-[10] w-screen h-40 !mx-auto flex justify-center border-1 bg-orange-200">
      <div className="wrapper w-full flex-grow-0 bg-blue-50 relative">
        <ul className="flex flex-col items-center justify-between h-full">
          <li className="bg-blue-50">
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
