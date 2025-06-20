import type { Disk } from "./discography";

export interface CountdownTimerProps {
  releaseDate: Date;
  albumMeta?: Disk;
  videoId?: string;
}

export interface CountdownRendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  language: "ko" | "en" | string;
}
