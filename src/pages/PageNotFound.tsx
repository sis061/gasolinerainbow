import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cx from "classnames";
import useLanguageStore from "@/store/useLanguageStore";

const PageNotFound = () => {
  const [img, setImg] = useState<string>("");
  const [timer, setTimer] = useState<number>(5);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language } = useLanguageStore();

  const isDiscography = pathname.startsWith("/discography");
  const isNotes = pathname.startsWith("/authornote");
  const isStreamRedirect = pathname.startsWith("/stream");

  const backgroundColor =
    isDiscography || isNotes || isStreamRedirect
      ? "bg-transparent"
      : "bg-black/75";

  useEffect(() => {
    import("../assets/images/PageNotFound.webp")
      .then((module) => {
        setImg(module.default);
      })
      .catch((e) => console.log("img load error:", e));

    const timeoutId = setTimeout(() => navigate("/"), 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId); // 타이머가 0 되면 정지
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      className={cx(
        "wrapper-full w-full min-h-screen !-mt-24 overflow-x-hidden !mx-auto flex justify-center",
        backgroundColor
      )}
    >
      <div className="inner-full flex-grow-0 w-full flex items-center justify-center !mb-10 md:!pt-10 max-md:!px-4">
        <div className="flex flex-col gap-10 items-center justify-center w-full h-auto">
          {img && (
            <img
              src={img}
              alt="페이지를 찾을 수 없음"
              className="opacity-50 max-w-72 "
            />
          )}
          <div className="flex flex-col items-center gap-4 [&_*]:!text-white">
            <span className="font-bold text-xl md:text-2xl lg:text-5xl z-50">
              404 PAGE NOT FOUND
            </span>
            <span className="!text-black opacity-75">
              {language === "ko"
                ? `${timer}초 뒤 메인으로 돌아갑니다.`
                : `Go back to Main in ${timer} seconds`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
