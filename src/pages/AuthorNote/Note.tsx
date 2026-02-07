import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/lib/auth/useAuth";

import useLanguageStore from "@/store/useLanguageStore";
import type { Note } from "@/types/note";
import { renderNoteTypeColor } from "@/utils/globalHelper";

export default function Note() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<null | boolean>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!user) {
        setIsAdmin(null);
        return;
      }

      const { data, error } = await supabase.rpc("is_admin_email");

      if (cancelled) return;

      if (error) setIsAdmin(false);
      else setIsAdmin(!!data);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const [note, setNote] = useState<Note | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  /************/
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguageStore();

  const fetchNote = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("id", Number(id))
      .is("deleted_at", null)
      .single();

    if (!data || error) {
      navigate("/authornote", { replace: true });
      console.log(error);
      return;
    }

    setNote(data);
  };
  useEffect(() => {
    if (!id) return;
    fetchNote();
  }, [id]);

  const styledContent = useMemo(() => {
    if (!note?.content) return "";

    return note.content.replace(
      /<img /g,
      `<img
    class="skeleton !mx-auto !my-6 md:w-2/3 w-full h-auto"
    onload="this.classList.remove('skeleton')"
    `,
    );
  }, [note?.content]);

  const deleteNote = async (id: number) => {
    if (!confirm("진짜 지울거?")) return;

    if (!user) return;
    if (!isAdmin) return;

    const { error } = await supabase
      .from("notes")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("Delete failed:", error.message);
      return;
    }

    fetchNote();
  };

  if (!note) {
    return null; // 리다이렉트 중이므로 UI 렌더링 안함
  }

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
              style={{
                backgroundColor: renderNoteTypeColor(note.category),
              }}
              variant="outline"
              className="!text-white border-none !py-1 !px-2 rounded-xs rounded-tr-none"
            >
              {note.category}
            </Badge>
          </div>

          <h1 className="text-2xl md:text-4xl font-semibold !pl-1">
            {note.title}
          </h1>
          <div
            ref={imgRef}
            className="w-full whitespace-pre-wrap !py-6"
            dangerouslySetInnerHTML={{ __html: styledContent }}
          />
          <div className="w-full flex justify-end">
            {isAdmin && (
              <button
                className="border bg-red-500 !px-2 max-w-32 !text-white"
                onClick={() => deleteNote(Number(id))}
              >
                삭제
              </button>
            )}
            <Button
              variant="ghost"
              className="!px-4 cursor-pointer hover:!bg-accent/25 rounded-xs"
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
