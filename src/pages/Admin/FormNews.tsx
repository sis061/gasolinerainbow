import AdminSelector from "@/components/AdminSelector";
import ImageUploader from "@/components/ImageUploader";
import TextEditor from "@/components/TextEditor";

import { useState } from "react";

const TYPE = ["performance", "release", "collaboration", "others"];

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export default function FormNews() {
  const [date, setDate] = useState(formatDate(new Date()));
  const [type, setType] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [titleKr, setTitleKr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [contentKr, setContentKr] = useState("");
  const [contentEn, setContentEn] = useState("");

  return (
    <ul className="flex flex-col gap-8 [&_h3]:font-extrabold">
      <li className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
        <h3>날짜</h3>
        <input
          type="date"
          className="border !px-4 !py-1 !bg-white rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </li>
      <li className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
        <h3>타입</h3>
        <AdminSelector items={TYPE} onChange={setType} />
      </li>

      <li className="fle flex-col items-start gap-4 !space-y-4">
        <h3>대표이미지</h3>
        <ImageUploader onChange={setCoverImage} />
      </li>

      <li className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
        <h3>한글 제목</h3>
        <input
          type="text"
          className="border grow !px-4 !py-1 !bg-white rounded-md max-sm:w-full"
          value={titleKr}
          onChange={(e) => setTitleKr(e.target.value)}
        />
      </li>

      <li className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
        <h3>영문 제목</h3>
        <input
          type="text"
          className="border grow !px-4 !py-1 !bg-white rounded-md max-sm:w-full"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
        />
      </li>

      <li className="flex flex-col items-start w-full !space-y-4">
        <h3>한글 내용</h3>
        <TextEditor
          value={contentKr}
          onChange={setContentKr}
          placeholder="한글 내용을 입력."
        />
      </li>

      <li className="flex flex-col items-start w-full !space-y-4">
        <h3>영문 내용</h3>
        <TextEditor
          value={contentEn}
          onChange={setContentEn}
          placeholder="영문 내용을 입력."
        />
      </li>

      <button
        type="submit"
        onClick={() => {
          console.log({
            date,
            type,
            image: coverImage,
            titleKr,
            titleEn,
            contentKr,
            contentEn,
          });
        }}
        className="border max-w-1/3 !p-2 bg-black !text-white self-end"
      >
        업로드
      </button>
    </ul>
  );
}
