/**
 * @description 음원 타입에 따라서 해당하는 한/영 string을 뱉습니다.
 * @param v 음원 타입 / ex) album, single, ep, ost
 * @returns {kr: string; en: string;}
 */

export const renderDiskType = (v: string) => {
  let type;

  switch (v) {
    case "album":
      type = { kr: "앨범", en: "Album" };
      break;
    case "remix":
      type = { kr: "리믹스", en: "Remix" };
      break;
    case "single":
      type = { kr: "싱글", en: "Single" };
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

/**
 * @description 밀리세컨드 => DD-MM-YYYY 변환기
 * @param {millis lang} 밀리초, 현재 언어
 * @returns {string} DD-MM-YYYY
 */

export const formatTimestamp = (millis: number, lang: string): string => {
  const date = new Date(millis);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const render =
    lang === "ko" ? `${year}-${month}-${day}` : `${day}-${month}-${year}`;

  return render;
};

/**
 * @description 한영 전환에 따른 일자 표시 변환기
 * @param {dateStr lang},
 * @returns {string} YYYY-MM-DD => Month, D, YYYY
 */

export const formatDateByLang = (dateStr: string, lang = "en") => {
  const [year, month, day] = dateStr.split("-").map(Number);

  if (lang === "ko") {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  } else {
    const date = new Date(Date.UTC(year, month - 1, day)); // UTC 기준
    const formatter = new Intl.DateTimeFormat(lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formatter.format(date); // 예: June 5, 2025
  }
};

import type { NewsType } from "@/types/news";
import Bowser from "bowser";

type UserPlatformType = "desktop" | "mobile" | "tablet" | "tv" | "embedded";

/**
 * @description 사용자 기기 판별
 * @returns {PlatformType}
 */

export function getUserPlatformType(): UserPlatformType {
  const browser = Bowser.getParser(window.navigator.userAgent);
  let platformType = browser.getPlatformType() as UserPlatformType;
  // Bowser 기본 판별 (desktop / mobile / tablet / etc.)

  // --- 1) User-Agent Client Hints (최신 브라우저) ---
  const uaData = (navigator as any).userAgentData;
  if (uaData?.platform) {
    // 예: "iPad", "iPhone", "Android", "Windows", "macOS" 등
    const plat = uaData.platform.toLowerCase();
    if (plat.includes("ipad")) {
      return "tablet";
    }
    if (
      plat.includes("iphone") ||
      (plat.includes("android") && uaData.mobile)
    ) {
      return "mobile";
    }
    if (plat.includes("android") && !uaData.mobile) {
      // 안드로이드 기기 중 태블릿이라면 userAgentData.mobile === false일 수 있음
      return "tablet";
    }
    // 그 외 예: "macOs", "windows", "linux" 등은 desktop
    // 그러나, iPadOS가 platform으로 macOS를 내보낼 수도 있으니 아래 터치 체크가 필요
  }

  // --- 2) UA 문자열 안에 "iPad"가 남아 있는지 확인 (구형 iPad / 일부 브라우저) ---
  if (/iPad/.test(window.navigator.userAgent)) {
    return "tablet";
  }

  // --- 3) iPadOS 13+ Safari 대응: UA에 "Macintosh"로 보내면서도 터치스크린을 가지는 경우 ---
  // userAgentData 없거나 macOS로 나왔더라도, 실제 터치 포인트가 1보다 크면 iPad
  if (
    typeof navigator.maxTouchPoints === "number" &&
    navigator.maxTouchPoints > 1 &&
    browser.getPlatformType() === "desktop"
  ) {
    return "tablet";
  }

  // 그 외 Bowser가 리턴한 결과를 그대로 사용
  return platformType;
}

/**
 * @description 소식 주제에 따라서 다른 색깔을 보여줍니다.
 * @param t NewsType
 * @returns {string} #ffffff
 */

export const renderNewsTypeColor = (t: NewsType) => {
  let colour: string;

  switch (t) {
    case "collaboration":
      colour = "#FF5722";
      break;
    case "release":
      colour = "#ff0000";
      break;
    case "performance":
      colour = "#D500F9";
      break;
    case "others":
      colour = "#00C853";
      break;
    default:
      colour = "#607D8B";
      break;
  }

  return colour;
};

/**
 * @description 소식 주제에 따라서 다른 색깔을 보여줍니다.
 * @param t NewsType
 * @returns {string} #ffffff
 */

export const renderNoteTypeColor = (t: string) => {
  let colour: string;

  switch (t) {
    case "모디파이는 질병입니다.":
      colour = "#F44336";
      break;
    case "커피하우스 토크":
      colour = "#795548";
      break;
    case "프롤로그":
      colour = "#03A9F4";
      break;
    case "에필로그":
      colour = "#9C27B0";
      break;
    default:
      colour = "#00000000";
      break;
  }

  return colour;
};

/**
 * @description 텍스트 내에서 url, email, 인스타그램 멘션 을 분리한 후 a 태그로 변경합니다.
 * @param text string
 * @returns {string}
 */

export function linkify(text: string): string {
  const urlRegex = /((https?:\/\/|www\.)[^\s<>"'()]+(\([^\s<>"']*\))?)/gi;
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}\b/g;
  const instagramRegex = /@([a-zA-Z0-9._]+)/g;

  // 1. 이메일 먼저 링크화 & 보호
  const emailPlaceholders: string[] = [];
  let result = text.replace(emailRegex, (email) => {
    const placeholder = `__EMAIL_PLACEHOLDER_${emailPlaceholders.length}__`;
    emailPlaceholders.push(
      `<a href="mailto:${email}" class="email-link">${email}</a>`
    );
    return placeholder;
  });

  // 2. URL 링크화 (괄호 처리 포함)
  function processUrl(url: string): { link: string; tail: string } {
    const bracketPairs: [string, string][] = [
      ["(", ")"],
      ["[", "]"],
      ["{", "}"],
      ['"', '"'],
      ["'", "'"],
    ];

    let matchedUrl = url;

    for (const [open, close] of bracketPairs) {
      let openCount = (matchedUrl.match(new RegExp(`\\${open}`, "g")) || [])
        .length;
      let closeCount = (matchedUrl.match(new RegExp(`\\${close}`, "g")) || [])
        .length;

      while (closeCount > openCount && matchedUrl.endsWith(close)) {
        matchedUrl = matchedUrl.slice(0, -1);
        closeCount--;
      }
    }

    const tail = url.slice(matchedUrl.length);
    return { link: matchedUrl, tail };
  }

  result = result.replace(urlRegex, (url) => {
    const { link, tail } = processUrl(url);
    const href = link.startsWith("http") ? link : `https://${link}`;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="url-link">${link}</a>${tail}`;
  });

  // 3. 인스타그램 @링크화 (이메일 부분 제외됨)
  result = result.replace(instagramRegex, (_match, username) => {
    return `<a href="https://instagram.com/${username}" target="_blank" rel="noopener noreferrer" class="mention-link">@${username}</a>`;
  });

  // 4. 이메일 placeholder 복원
  emailPlaceholders.forEach((tag, i) => {
    result = result.replace(`__EMAIL_PLACEHOLDER_${i}__`, tag);
  });

  return result;
}
