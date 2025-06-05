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

export default function Note() {
  const imgRef = useRef<HTMLDivElement | null>(null);
  /************/
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguageStore();
  const { category, title }: NoteProps = location.state.note;
  const content: string = location?.state.content ?? "";

  useEffect(() => {
    const imgs = imgRef.current?.querySelectorAll("img");

    map(imgs, (img) => {
      img?.classList.add(
        "!mx-auto",
        "!my-6",
        "shadow-md",
        "max-w-2/3",
        "min-w-1/2",
        "min-h-1/2"
      );
    });
  }, []);

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
