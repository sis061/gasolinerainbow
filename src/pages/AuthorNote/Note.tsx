import { useEffect, useRef } from "react";
/************/
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
/************/
import { useLocation, useNavigate } from "react-router-dom";
import map from "lodash/map";
/************/
import type { NoteProps } from "@/types/authornote";
import useLanguageStore from "@/store/useLanguageStore";

function Note() {
  const imgRef = useRef<HTMLDivElement | null>(null);
  /************/
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguageStore();

  // location.state 없으면 /authornote로 강제 이동 (직접 접근 방지)
  useEffect(() => {
    if (!location.state || !location.state.note) {
      navigate("/authornote", { replace: true });
      return;
    }

    const container = imgRef.current;
    if (!container) return;

    const imgs = container.querySelectorAll("img");

    map(imgs, (img) => {
      // 기존 Tailwind 스타일 추가
      img?.classList.add(
        "!mx-auto",
        "!my-6",
        "shadow-md",
        "md:max-w-2/3",
        "md:min-w-1/2",
        "md:min-h-1/2",
        "max-w-full",
        "min-w-[95]",
        "min-h-auto",
        "!bg-[#333]",
        "opacity-0", // 처음에는 투명
        "transition-opacity",
        "duration-500"
      );

      const wrapper = document.createElement("div");
      wrapper.className =
        "relative flex justify-center items-center my-6 w-full bg-transparent";

      const skeleton = document.createElement("div");
      skeleton.className =
        "absolute inset-0 rounded-md bg-muted animate-pulse min-h-[200px] w-full max-w-full";

      const onLoad = () => {
        skeleton.remove();
        img.classList.remove("opacity-0");
        img.removeEventListener("load", onLoad);
      };

      img.addEventListener("load", onLoad);

      img.parentNode?.insertBefore(wrapper, img);
      wrapper.appendChild(skeleton);
      wrapper.appendChild(img);
    });
  }, [location.state, navigate]);

  // location.state가 확실할 때만 읽기
  if (!location.state || !location.state.note) {
    return null; // 강제 이동 중이므로 UI 렌더링 안함
  }
  const { category, title }: NoteProps = location?.state.note;
  const content: string = location?.state.content ?? "";

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center max-md:!px-4 !mb-10 md:!mt-10">
      <div className="inner flex-grow-0 w-full h-full flex items-center justify-center bg-white/75 !p-6 shadow-2xl ">
        <div className="w-full h-full flex flex-col">
          <div className="!mb-6 flex w-full items-center justify-between">
            <ArrowLeft
              size={24}
              className="cursor-pointer hover:animate-pulse"
              onClick={() => navigate("/authornote")}
            />
            <Badge
              variant="outline"
              className="border-black !py-1 !px-2 rounded-tr-none"
            >
              {category}
            </Badge>
          </div>

          <h1 className="text-2xl md:text-4xl font-semibold !pl-1">{title}</h1>
          <div
            ref={imgRef}
            className="w-full whitespace-pre-wrap !py-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="w-full flex justify-end ">
            <Button
              variant="ghost"
              className="!px-4 cursor-pointer hover:!bg-accent/50"
              onClick={() => navigate("/authornote")}
            >
              <ArrowLeft />
              {language === "ko" ? "목록으로 돌아가기" : "Back to list"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Note;
