import { DrawerTrigger } from "@/components/ui/drawer";
import type { Track } from "@/types/discography";
/************/
import cx from "classnames";
import _ from "lodash";
/************/

interface TrackListProps {
  tracks: Track[];
  align: "left" | "right";
  selectedTrack: Track | null;
  onSelect: (...params: any) => any;
}

const TrackList = ({
  tracks,
  align = "left",
  onSelect,
  selectedTrack,
}: TrackListProps) => {
  const isRight = align === "right";

  return (
    <ol
      className={cx(
        "w-full flex flex-col gap-2 [&_>li]:w-full [&_>li]:break-all",
        isRight ? "relative text-right max-md:text-center" : "text-left"
      )}
    >
      {_.map(tracks, (tr, i) => (
        <li key={tr.trackNo}>
          {tr.lyrics ? (
            <DrawerTrigger
              onClick={() => onSelect(tr)}
              className={cx(
                "cursor-pointer !px-2 relative transition-all duration-200 hover:opacity-50",
                isRight ? "text-right max-md:text-center" : "text-left",
                selectedTrack?.trackNo === i + 1 &&
                  "!bg-white/75 [&_>span]:!text-black"
              )}
            >
              <span>
                {tr.trackNo}. {tr.title}
              </span>
            </DrawerTrigger>
          ) : (
            <span className="!px-1.5">
              {tr.trackNo}. {tr.title}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
};

export default TrackList;
