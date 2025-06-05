export type NewsType = "performance" | "release" | "collaboration" | "others";

export interface News {
  idx: number;
  type: NewsType;
  date: string;
  img: string;
  title: string;
  content: string;
}
