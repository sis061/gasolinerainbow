import _ from "lodash";
import DOMPurify from "dompurify";
// import { useMediaQuery } from "react-responsive";

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
import { useState } from "react";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import cx from "classnames";

const noteMockData = [
  {
    idx: 0,
    category: "에필로그",
    title: "제목제목제목",
    content: `
    <img src="/images/sample.jpg" alt="샘플 이미지22" />
    <p>안녕하세요. 이 글은 <strong>마치 블로그처럼</strong> 표현된 콘텐츠입니다.내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...</p>
      <p>줄바꿈도 이렇게 하고, <em>기울임</em>도 사용할 수 있어요.</p>
      <img src="/images/sample.jpg" alt="샘플 이미지" />
      <p>이미지 위아래로도 텍스트를 넣을 수 있습니다.</p>
      <h2>소제목도 넣고 싶다면?</h2>
      <p>이건 <code>&lt;h2&gt;</code> 태그를 사용하면 됩니다.</p>
      <ul>
        <li>1. 리스트도 가능</li>
        <li>2. 이렇게 사용 가능</li>
      </ul>
    `,
  },
  {
    idx: 1,
    category: "모디파이는 질병입니다.",
    title: "제목2제목2제목",
    content:
      "내용2입니다. 내용2...내용2입니다. 내용2...내용2입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...",
  },
  {
    idx: 2,
    category: "에필로그",
    title: "제목제목제목",
    content:
      "내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...",
  },
  {
    idx: 3,
    category: "모디파이는 질병입니다.",
    title: "제목2제목2제목",
    content:
      "내용2입니다. 내용2...내용2입니다. 내용2...내용2입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...",
  },
  {
    idx: 4,
    category: "에필로그",
    title: "제목제목제목",
    content:
      "내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...",
  },
  {
    idx: 5,
    category: "모디파이는 질병입니다.",
    title: "제목2제목2제목",
    content:
      "내용2입니다. 내용2...내용2입니다. 내용2...내용2입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...",
  },
  {
    idx: 6,
    category: "에필로그",
    title: "제목제목제목",
    content:
      "내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...",
  },
  {
    idx: 7,
    category: "모디파이는 질병입니다.",
    title: "제목2제목2제목",
    content:
      "내용2입니다. 내용2...내용2입니다. 내용2...내용2입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...",
  },
  {
    idx: 8,
    category: "에필로그",
    title: "제목제목제목",
    content:
      "내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...내용입니다. 내용...",
  },
];

const filterHTMLTags = (content: string): string => {
  if (!content) return "";

  // 1. 줄바꿈을 공백으로 바꾸고
  let text = content.replace(/(\r\n|\n|\r)/gm, " ");

  // 2. HTML 태그 제거
  text = text.replace(/<[^>]*>/g, "");

  // 3. &nbsp; 같은 HTML 엔티티를 일반 문자로 (선택)
  text = text.replace(/&nbsp;/g, " ");
  text = text.replace(/&amp;/g, "&");
  text = text.replace(/&lt;/g, "<");
  text = text.replace(/&gt;/g, ">");
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");

  // 4. 앞뒤 공백 제거 후 반환
  return text.trim();
};

export default function AuthorNote() {
  const navigate = useNavigate();
  //TODO: 목록으로 돌아가기 적용하려면 page 값 스토어에 저장해두기
  const [page, setPage] = useState<number>(1);

  //   const maxDesktop = useMediaQuery({ maxWidth: 124 });
  //   const maxLaptop = useMediaQuery({ maxWidth: 768 });
  //   const maxTablet = useMediaQuery({ maxWidth: 640 });
  // 페이지 행 수
  //   const rowsPerPage = maxTablet ? 12 : maxLaptop ? 9 : maxDesktop ? 6 : 5;
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

  return (
    <section className="wrapper w-full min-h-[calc(100dvh-8rem)] overflow-x-hidden !mx-auto flex justify-center max-md:!px-4 !mb-10 md:!mt-10">
      <div className="inner flex-grow-0 h-full w-full flex flex-col items-start justify-between bg-white/75 !p-6 shadow-2xl">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent flex md:table-row w-full items-center min-h-6">
              <TableHead className="md:!pl-1 max-md:text-xs order-1 h-full">
                No.
              </TableHead>
              <TableHead className="max-md:!pr-2 md:!pl-1.5 max-md:text-xs order-3 md:!order-2 h-full">
                카테고리
              </TableHead>
              <TableHead className="order-2 md:!order-3 w-full h-full" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {_.map(tableLists, (note) => {
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
                  <TableCell className="order-1 !pr-2 md:!px-2">
                    {note.idx + 1}
                  </TableCell>
                  <TableCell className="max-md:absolute max-md:w-1/2 max-md:text-right top-1.5 right-0 order-3 md:order-2 max-md:text-xs !px-2">
                    {note.category}
                  </TableCell>
                  <TableCell className="order-2 md:order-3 !py-4 max-md:!py-6 flex flex-col gap-3 justify-center cursor-pointer !px-2">
                    <span className="text-xl lg:text-2xl font-semibold">
                      {note.title}
                    </span>
                    <p className="whitespace-normal !line-clamp-2">
                      {filterHTMLTags(note?.content)}
                    </p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Pagination className="!pt-6">
          <PaginationContent>
            {/* 이전 페이지 그룹 */}
            {startPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => setPage(startPage - 1)}
                  className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            )}
            {/* 이전 페이지로 */}
            <PaginationLink
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
            {/* 현재 그룹 페이지들 */}
            {_.range(startPage, endPage + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={page === p}
                  onClick={() => setPage(p)}
                  className={cx(page !== p && "cursor-pointer")}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* 다음 페이지로 */}
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
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
                  onClick={() => setPage(endPage + 1)}
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
