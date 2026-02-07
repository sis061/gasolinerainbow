export type NewsType = "performance" | "release" | "collaboration" | "others";

export interface News {
  idx?: number;
  id: number;
  type: NewsType;
  date: string;
  image: string;
  titleKr: string;
  titleEn: string;
  contentKr: string;
  contentEn: string;
}
