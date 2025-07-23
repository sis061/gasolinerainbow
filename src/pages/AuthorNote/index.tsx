import React from "react";
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

import { useNavigate } from "react-router-dom";
import cx from "classnames";
import map from "lodash/map";
import range from "lodash/range";
import { useMediaQuery } from "react-responsive";

import { noteData } from "@/utils/noteData";
import { filterHTMLTags, renderNoteTypeColor } from "@/utils/globalHelper";
import useLanguageStore from "@/store/useLanguageStore";
import CustomBadge from "@/components/CustomBadge";

const PAGE_GROUP_SIZE = 5;
const reversedNotes = [...noteData].slice().reverse();

export default function AuthorNote() {
  const [page, setPage] = useState<number>(() => {
    const restored = Number(sessionStorage.getItem("authornotePage"));
    return restored > 0 ? restored : 1;
  });
  const navigate = useNavigate();
  const minMobile = useMediaQuery({ minWidth: 640 });
  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();

  const goDetail = (note: any) => {
    navigate(`/authornote/${note.idx}`);
  };

  // 페이지 수에 따른 목록 렌더링
  const ROWS_PER_PAGE = minMobile ? (minTablet ? 6 : 4) : 3;
  const totalPages = Math.ceil(reversedNotes.length / ROWS_PER_PAGE);
  const currentGroup = Math.floor((page - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  // 페이지에 따른 리스트 슬라이스
  const tableLists = React.useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    return reversedNotes.slice(start, end);
  }, [page, reversedNotes, ROWS_PER_PAGE]);

  // 디테일 페이지에서 뒤로가기 시 목록 restore 위해 세션스토리지 저장
  useEffect(() => {
    sessionStorage.setItem("authornotePage", String(page));
  }, [page]);

  useEffect(() => {
    const savedScroll = Number(sessionStorage.getItem("authornoteScroll"));
    if (savedScroll > 0) {
      setTimeout(() => {
        window.scrollTo(0, savedScroll);
      }, 50); // delay로 layout 완료 후 위치 이동
    }
  }, []);

  useEffect(() => {
    return () => {
      sessionStorage.setItem("authornoteScroll", String(window.scrollY));
    };
  }, []);

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-17rem)] overflow-x-hidden !mx-auto flex justify-center max-md:!px-4 !mb-10 !mt-4 md:!mt-10">
      <div className="inner flex-grow-0 h-full w-full flex flex-col items-start justify-between bg-white/75 !p-6 shadow-2xl">
        <Table className="w-full ">
          <TableHeader>
            <TableRow className="hover:bg-transparent flex md:table-row w-full items-center min-h-6">
              <TableHead className="md:!pl-1 max-md:text-xs order-1 h-full !pb-2">
                No.
              </TableHead>
              <TableHead className="max-md:!pr-2 md:!pl-1.5 max-md:text-xs order-3 md:!order-2 h-full !pb-2">
                {language === "ko" ? "카테고리" : "Category"}
              </TableHead>
              <TableHead className="order-2 md:!order-3 w-full h-full" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {map(tableLists, (note) => {
              return (
                <TableRow
                  key={note.idx}
                  onClick={() => {
                    goDetail(note);
                  }}
                  className="flex md:table-row w-full items-center relative"
                >
                  <TableCell className="order-1 !pr-2 md:!px-2 text-center">
                    {!minTablet && (
                      <CustomBadge
                        placement="top-left"
                        label="N"
                        startDate={note?.date}
                        expireIn="2weeks"
                      />
                    )}
                    {note.idx + 1}
                  </TableCell>
                  <TableCell className="h-full whitespace-normal md:min-w-[10rem] max-md:h-auto max-md:absolute max-md:w-full max-md:text-right top-1.5 right-0 order-3 md:order-2 max-md:text-xs !px-2">
                    <div
                      style={{
                        borderColor: renderNoteTypeColor(note.category),
                      }}
                      className="border-r-2 md:border-r-0 md:border-l-2 md:!min-h-12 flex items-center justify-end md:justify-start"
                    >
                      <span className="!px-1">{note.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="relative order-2 md:order-3 !py-4 max-md:!py-6 flex flex-col gap-3 justify-center cursor-pointer !px-2 max-md:!mt-1">
                    {minTablet && (
                      <CustomBadge
                        placement="top-right"
                        label="N"
                        startDate={note?.date}
                        expireIn="2weeks"
                      />
                    )}
                    <span className="text-xl lg:text-2xl font-semibold whitespace-normal line-clamp-1">
                      {note.title}
                    </span>
                    <p className="whitespace-normal line-clamp-1">
                      {filterHTMLTags(note?.content)}
                    </p>
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
                    "aria-disabled:!cursor-default aria-disabled:hover:[&_>svg]:stroke-black/25 hover:bg-transparent hover:[&_>svg]:stroke-accent *:transition-all duration-150 cursor-pointer rounded-xs hover:animate-pulse"
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
                "aria-disabled:!cursor-default aria-disabled:hover:[&_>svg]:stroke-black/25 hover:bg-transparent hover:[&_>svg]:stroke-accent *:transition-all duration-150 cursor-pointer rounded-xs hover:animate-pulse"
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
                    "rounded-xs border-none *:transition-all duration-150"
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
                  "aria-disabled:!cursor-default aria-disabled:hover:[&_>svg]:stroke-black/25 hover:bg-transparent hover:[&_>svg]:stroke-accent *:transition-all duration-150 cursor-pointer rounded-xs hover:animate-pulse"
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
                    "aria-disabled:!cursor-default aria-disabled:hover:[&_>svg]:stroke-black/25 hover:bg-transparent hover:[&_>svg]:stroke-accent *:transition-all duration-150 cursor-pointer rounded-xs hover:animate-pulse"
                  )}
                >
                  <ChevronsRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
