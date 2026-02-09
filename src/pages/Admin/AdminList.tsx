import React, { useMemo } from "react";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import cx from "classnames";
import map from "lodash/map";
import range from "lodash/range";
import { useMediaQuery } from "react-responsive";

import type { News } from "@/types/news";
import type { Note } from "@/types/note";

interface NewsList extends News {
  listType: "news";
  deleted_at: string | null; // ISO 8601 timestamp
}
interface NoteList extends Note {
  listType: "note";
  deleted_at: string | null; // ISO 8601 timestamp
}

const PAGE_GROUP_SIZE = 5;

export default function AdminList() {
  const [newsData, setNewsData] = useState<NewsList[]>([]);
  const [noteData, setNoteData] = useState<NoteList[]>([]);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      const [newsRes, notesRes] = await Promise.allSettled([
        supabase
          .from("news")
          .select(`id,date,titleKr,deleted_at`)
          //   .is("deleted_at", null)
          .order("id", { ascending: false }),
        supabase
          .from("notes")
          .select(`id,date,title,deleted_at`)
          //   .is("deleted_at", null)
          .order("id", { ascending: false }),
      ]);

      if (!alive) return;

      if (newsRes.status === "fulfilled") {
        const { data, error } = newsRes.value;
        if (!error && data)
          setNewsData(
            data.map((el) => ({ ...el, listType: "news" })) as NewsList[],
          );
        else setNewsData([]);
      } else {
        setNewsData([]);
      }

      if (notesRes.status === "fulfilled") {
        const { data, error } = notesRes.value;
        if (!error && data)
          setNoteData(
            data.map((el) => ({ ...el, listType: "note" })) as NoteList[],
          );
        else setNoteData([]);
      } else {
        setNoteData([]);
      }
    };

    run();

    return () => {
      alive = false;
    };
  }, []);

  const deleteItem = async (item: NewsList | NoteList) => {
    if (!confirm("진짜 지울거?")) return;

    if (item.listType === "news") {
      const { error } = await supabase
        .from("news")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", item?.id);
      window.location.reload();

      if (error) {
        console.error("Delete failed:", error.message);
        return;
      }
      return;
    } else {
      const { error } = await supabase
        .from("notes")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", item?.id);
      window.location.reload();

      if (error) {
        console.error("Delete failed:", error.message);
        return;
      }
      return;
    }
  };

  const [page, setPage] = useState<number>(1);
  const allData = useMemo(
    () =>
      [...newsData, ...noteData].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [newsData, noteData],
  );

  const minMobile = useMediaQuery({ minWidth: 640 });
  const minTablet = useMediaQuery({ minWidth: 768 });

  // 페이지 수에 따른 목록 렌더링
  const ROWS_PER_PAGE = minMobile ? (minTablet ? 6 : 4) : 3;
  const totalPages = Math.ceil(allData.length / ROWS_PER_PAGE);
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  // 페이지에 따른 리스트 슬라이스
  const tableLists = React.useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    return allData.slice(start, end);
  }, [page, allData, ROWS_PER_PAGE]);

  return (
    <div>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="hover:bg-transparent flex md:table-row w-full items-center min-h-6">
            <TableHead className="max-md:!pr-2 md:!pl-1.5 max-md:text-xs order-3 md:!order-2 h-full !pb-2">
              분류
            </TableHead>
            <TableHead className="order-2 md:!order-3 w-full h-full">
              제목
            </TableHead>
            <TableHead className="md:!pl-1 max-md:text-xs order-1 h-full !pb-2" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {map(tableLists, (item, i) => {
            return (
              <TableRow
                key={i}
                //   onClick={() => {
                //     goDetail(note);
                //   }}
                className="flex md:table-row w-full items-center relative"
                style={{ backgroundColor: item?.deleted_at ? "#00000030" : "" }}
              >
                <TableCell className="h-full whitespace-normal md:min-w-[10rem] max-md:h-auto max-md:absolute max-md:w-full max-md:text-right top-1.5 right-0 order-1 md:order-1 max-md:text-xs !px-2 ">
                  <div
                    style={{
                      borderColor:
                        item.listType === "news" ? "#D500F9" : "#795548",
                    }}
                    className="border-r-2 md:border-r-0 md:border-l-2 md:!min-h-12 flex items-center justify-end md:justify-start"
                  >
                    <span className="!px-1">
                      {item?.listType === "news" ? "소식" : "작가의 말"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="relative order-2 md:order-3 !py-8 max-md:!py-6 flex flex-col gap-3 justify-center !px-2 max-md:!mt-1">
                  <span className="text-lg lg:text-xl font-semibold whitespace-normal line-clamp-1">
                    {item?.deleted_at && (
                      <span className="text-sm !text-red-500">[삭제됨]</span>
                    )}{" "}
                    {item?.listType === "note" ? item?.title : item?.titleKr}
                  </span>
                </TableCell>
                <TableCell className="!pr-2 md:!px-2 text-center md:min-w-[10rem] max-md:h-auto max-md:absolute max-md:w-full max-md:text-right bottom-1.5 right-0 md:order-3">
                  <div className="w-full h-full flex items-center justify-end gap-2 [&_button]:!px-2 [&_button]:!py-1">
                    <button>수정</button>/
                    <button
                      disabled={!!item?.deleted_at}
                      onClick={() => deleteItem(item)}
                      className="[data-disabled]:bg-red-500"
                    >
                      삭제
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/************ 페이지네이션 ************/}
      <Pagination className="!pt-6">
        <PaginationContent>
          {/* 이전 페이지 그룹 */}
          {startPage > 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  setPage(startPage - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-disabled={page === startPage}
                className={cx(
                  page === startPage && "[&_>svg]:stroke-black/25",
                  "aria-disabled:!cursor-default aria-disabled:hover:[&_>svg]:stroke-black/25 hover:bg-transparent hover:[&_>svg]:stroke-accent *:transition-all duration-150 cursor-pointer rounded-xs hover:animate-pulse",
                )}
              >
                <ChevronsLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}
          {/* 이전 페이지로 */}
          <PaginationLink
            onClick={() => {
              setPage((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-disabled={page === startPage}
            className={cx(
              page === startPage && "[&_>svg]:stroke-black/25",
              "aria-disabled:!cursor-default aria-disabled:hover:[&_>svg]:stroke-black/25 hover:bg-transparent hover:[&_>svg]:stroke-accent *:transition-all duration-150 cursor-pointer rounded-xs hover:animate-pulse",
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationLink>
          {/* 현재 그룹 페이지들 */}
          {range(startPage, endPage + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={page === p}
                onClick={() => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={cx(
                  page !== p
                    ? "cursor-pointer hover:bg-accent/25 hover:!text-accent"
                    : "bg-accent/25 hover:bg-accent/25",
                  "rounded-xs border-none *:transition-all duration-150",
                )}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* 다음 페이지로 */}
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                setPage((prev) => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-disabled={page === totalPages}
              className={cx(
                page === endPage && "[&_>svg]:stroke-black/25",
                "aria-disabled:!cursor-default aria-disabled:hover:[&_>svg]:stroke-black/25 hover:bg-transparent hover:[&_>svg]:stroke-accent *:transition-all duration-150 cursor-pointer rounded-xs hover:animate-pulse",
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
          {/* 다음 페이지 그룹 */}
          {endPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  setPage(endPage + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-disabled={page === endPage}
                className={cx(
                  page === endPage && "[&_>svg]:stroke-black/25",
                  "aria-disabled:!cursor-default aria-disabled:hover:[&_>svg]:stroke-black/25 hover:bg-transparent hover:[&_>svg]:stroke-accent *:transition-all duration-150 cursor-pointer rounded-xs hover:animate-pulse",
                )}
              >
                <ChevronsRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
