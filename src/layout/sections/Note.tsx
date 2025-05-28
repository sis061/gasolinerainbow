import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import _ from "lodash";

interface NoteProps {
  idx: number;
  category: string;
  title: string;
  content: any;
}

export default function Note() {
  const imgRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { idx, category, title }: NoteProps = location.state.note;
  const content = location.state.content ?? "";

  useEffect(() => {
    const imgs = imgRef.current?.querySelectorAll("img");

    _.map(imgs, (img) => {
      img?.classList.add(
        "mx-auto",
        "my-6",
        "rounded-lg",
        "shadow-md",
        "max-w-full",
        "min-w-12",
        "min-h-12"
      );
    });
  }, []);

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center ">
      <div className="inner flex-grow-0 w-full flex items-center justify-center bg-white !px-6 !my-10 shadow-2xl">
        <div className="w-full h-full flex flex-col gap-10 !pt-10">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <div
            ref={imgRef}
            className="w-full whitespace-pre-wrap border-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="w-full flex justify-end !pb-10">
            <Button
              variant="outline"
              className="!px-6"
              onClick={() => navigate("/authornote")}
            >
              목록으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
