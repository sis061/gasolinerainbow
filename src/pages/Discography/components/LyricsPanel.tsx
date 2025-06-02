import type { Disk, Track } from "@/types/discography";

interface LyricsPanelProps {
  lyricsRef: React.RefObject<HTMLLIElement | null>;
  selectedTrack: Track | null;
  albumMeta: Disk;
}

const LyricsPanel = ({
  lyricsRef,
  selectedTrack,
  albumMeta,
}: LyricsPanelProps) => {
  return (
    <li
      ref={lyricsRef}
      className="w-1/2 max-h-[85%] bg-white/75 overflow-scroll !p-10 shadow-xl flex-grow"
    >
      <div className="whitespace-break-spaces">
        {selectedTrack ? (
          selectedTrack.lyrics
        ) : (
          <>
            <p className="!mb-6 whitespace-break-spaces">
              {albumMeta.description}
            </p>
            <hr className="!my-4 border-black/20" />
            <p className="text-xs opacity-80 whitespace-break-spaces">
              {albumMeta.credits}
            </p>
          </>
        )}
      </div>
    </li>
  );
};

export default LyricsPanel;
