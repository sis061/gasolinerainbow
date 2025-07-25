export type NewsType = "performance" | "release" | "collaboration" | "others";

export interface News {
  idx: number;
  type: NewsType;
  date: string;
  img: string;
  titleKr: string;
  titleEn: string;
  contentKr: string;
  contentEn: string;
}
