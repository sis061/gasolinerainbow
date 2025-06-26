// ──────────────────────기본 타입 정의───────────────────────

export type DiskType = "album" | "single" | "EP" | "ost" | "remix";

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
  titleKr: string;
  titleEn: string;
  lyrics: string | null;
  tags?: string[];
}

export interface TargetCarouselProps {
  carouselIndex: number;
  slideIndex: number;
}

export interface Disk {
  targetCarousel: TargetCarouselProps;
  type: DiskType;
  year: number;
  titleKr: string;
  titleEn: string;
  image: string;
  urls: DiskUrls;
  isCD: boolean;
  cdUrl?: [{ store: string; color: string; url: string }];
  maansunUrl?: string;
  descriptionKr: string;
  descriptionEn: string;
  credits: string;
  tracks: Track[];
}

// ──────────────────────공통 유틸 타입───────────────────────

export type TrackOrNull = Track | null;
export type OnChangeHandler = (...params: any[]) => any;
export type OnSelectTrackHandler = (track: Track) => void;
export type SetTrackState = React.Dispatch<React.SetStateAction<TrackOrNull>>;

// ──────────────────────컴포넌트 Props───────────────────────

export type MultipleIntroPanelProps = Pick<Disk, "year" | "image"> & {
  title: string;
};
export interface CarouselProps {
  albumMeta: Disk;
  isHoverToolip?: boolean;
  onChange?: OnChangeHandler;
  initialSlideIndex?: number;
  ready?: boolean;
}

export interface SingleCarouselsProps {
  albumMetas: Disk[];
  onChange?: OnChangeHandler;
  initialSlideIndex?: number;
  ready?: boolean;
}

export interface CarouselNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

export interface LyricsPanelProps {
  type: "album" | "others";
  lyricsRef: React.RefObject<HTMLLIElement | null>;
  selectedTrack: TrackOrNull;
  albumMeta: Disk;
}

export interface TrackListProps {
  tracks: Track[];
  align: "left" | "right" | "center";
  selectedTrack: TrackOrNull;
  onSelect: OnSelectTrackHandler;
}

export interface SingleInfoPanelProps {
  albumMeta: Disk;
  onChange?: OnChangeHandler;
  selectedTrack: TrackOrNull;
  setSelectedTrack: SetTrackState;
  isHoverToolip?: boolean;
}
