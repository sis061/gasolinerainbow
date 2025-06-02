/**
 * @description 음원 타입에 따라서 해당하는 한/영 string을 뱉습니다.
 * @param v 음원 타입 / ex) album, single, ep, ost
 * @returns {kr: string; en: string;}
 */

export const renderDiskType = (v: string) => {
  let type;

  switch (v) {
    case "album":
      type = { kr: "앨범", en: "ALBUM" };
      break;
    case "remix":
      type = { kr: "리믹스", en: "REMIX" };
      break;
    case "single":
      type = { kr: "싱글", en: "SINGLE" };
      break;
    case "EP":
      type = { kr: "EP", en: "EP" };
      break;
    case "ost":
      type = { kr: "OST", en: "OST" };
      break;

    default:
      type = { kr: "", en: "" };
      break;
  }
  return type;
};

/**
 * @description HTML 태그를 변환해줍니다.
 * @param content 음원 상세 내용
 * @returns string
 */

export const filterHTMLTags = (content: string): string => {
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
