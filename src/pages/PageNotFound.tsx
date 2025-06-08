import { useEffect, useState } from "react";

const PageNotFound = () => {
  const [img, setImg] = useState<string>("");

  useEffect(() => {
    import("../assets/images/PageNotFound.webp")
      .then((module) => {
        setImg(module.default);
      })
      .catch((e) => console.log("img load error:", e));
  }, []);

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-12rem)] overflow-x-hidden !mx-auto flex justify-center">
      <div className="inner flex-grow-0 w-full flex items-center justify-center !mb-10 md:!pt-10 max-md:!px-4">
        <div className="flex flex-col gap-10 items-center justify-center w-full h-auto">
          {img && (
            <img
              src={img}
              alt="페이지를 찾을 수 없음"
              className="opacity-50 max-w-72 "
            />
          )}
          <span className="font-bold text-5xl z-50">404 PAGE NOT FOUND</span>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
