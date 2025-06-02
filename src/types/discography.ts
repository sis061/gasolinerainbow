export type DiskType = "album" | "single" | "EP" | "ost";
export type MultipleIntroPanelProps = Pick<Disk, "year" | "title" | "image">;

export interface DiskUrls {
  bandcamp?: string;
  spotify?: string;
  youtubeMusic?: string;
  appleMusic?: string;
  melon?: string;
  bugs?: string;
  genie?: string;
}

export interface Track {
  trackNo: number;
  title: string;
  lyrics: string | null;
  tags?: string[];
}

export interface Disk {
  type: DiskType;
  year: number;
  title: string;
  image: string;
  urls: DiskUrls;
  isCD: boolean;
  cdUrl?: string | null;
  description: string;
  credits: string;
  tracks: Track[];
}
