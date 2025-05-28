import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-accent z-50 w-screen min-h-32 !px-[10rem] sticky top-0 overflow-hidden duration-200 lg:px-10 lg:h-24 flex justify-between items-center gap-10">
        <div className="overflow-hidden">
          <Link to="/">
            <img
              src=""
              alt="로고"
              className="w-20 h-20 border-1 border-black"
            />
          </Link>
        </div>
        <ul className="flex gap-5 [&_>li]:border-1 [&_>li]:!p-3 [&_>li]:flex [&_>li]:justify-center [&_>li]:items-center">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/profile">소개</Link>
          </li>
          <li>
            <Link to="discography">디스코그라피</Link>
          </li>
          <li>
            <Link to="/news">소식</Link>
          </li>
          <li>
            <Link to="/authornote">작가의 말</Link>
          </li>
        </ul>
        <div>한영 변환 셀렉트</div>
      </header>
    </>
  );
};

export default Header;
