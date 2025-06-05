import React from "react";
import { useEffect, useState } from "react";
/************/
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
/************/
import { useNavigate } from "react-router-dom";
import cx from "classnames";
import map from "lodash/map";
import range from "lodash/range";
import DOMPurify from "dompurify";
/************/
import { noteMockData } from "@/utils/noteData";
import { filterHTMLTags } from "@/utils/globalHelper";
import useLanguageStore from "@/store/useLanguageStore";

export default function AuthorNote() {
  const [page, setPage] = useState<number>(() => {
    const restored = Number(sessionStorage.getItem("authornotePage"));
    return restored > 0 ? restored : 1;
  });
  const navigate = useNavigate();
  const { language } = useLanguageStore();

  // 페이지 수에 따른 목록 렌더링
  const rowsPerPage = 6;
  const totalPages = Math.ceil(noteMockData.length / rowsPerPage);
  const pageGroupSize = 5;
  const currentGroup = Math.floor((page - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  // 페이지에 따른 리스트 슬라이스
  const tableLists = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return noteMockData.slice(start, end);
  }, [page, noteMockData, rowsPerPage]);

  // 디테일 페이지에서 뒤로가기 시 목록 restore 위해 세션스토리지 저장
  useEffect(() => {
    sessionStorage.setItem("authornotePage", String(page));
  }, [page]);

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center max-md:!px-4 !mb-10 md:!mt-10">
      <div className="inner flex-grow-0 h-full w-full flex flex-col items-start justify-between bg-white/75 !p-6 shadow-2xl">
        <Table className="w-full">
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
              const sanitizeContent = DOMPurify.sanitize(note?.content ?? "");
              return (
                <TableRow
                  key={note.idx}
                  onClick={() => {
                    navigate(`/authornote/${note?.idx ?? 0}`, {
                      state: { note, content: sanitizeContent },
                    });
                  }}
                  className="flex md:table-row w-full items-center relative"
                >
                  <TableCell className="order-1 !pr-2 md:!px-2 text-center">
                    {note.idx + 1}
                  </TableCell>
                  <TableCell className="whitespace-normal md:min-w-[9.25rem] max-md:absolute max-md:w-1/2 max-md:text-right top-1.5 right-0 order-3 md:order-2 max-md:text-xs !px-2">
                    {note.category}
                  </TableCell>
                  <TableCell className="order-2 md:order-3 !py-4 max-md:!py-6 flex flex-col gap-3 justify-center cursor-pointer !px-2">
                    <span className="text-xl lg:text-2xl font-semibold whitespace-normal line-clamp-1">
                      {note.title}
                    </span>
                    <p className="whitespace-normal line-clamp-1 sm:line-clamp-2">
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
                  className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
              className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
                  className={cx(page !== p && "cursor-pointer")}
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
                className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
                  className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
