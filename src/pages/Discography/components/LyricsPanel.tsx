import useLanguageStore from "@/store/useLanguageStore";
import { type LyricsPanelProps } from "@/types/discography";
import { motion, AnimatePresence } from "framer-motion";
import cx from "classnames";

const LyricsPanel = ({
  type = "album",
  lyricsRef,
  selectedTrack,
  albumMeta,
}: LyricsPanelProps) => {
  const { language } = useLanguageStore();
  const descTranslated =
    language === "ko" ? albumMeta.descriptionKr : albumMeta.descriptionEn;
  return (
    <li
      ref={lyricsRef}
      className={cx(
        " bg-white/75 overflow-scroll !p-10 shadow-xl flex-grow",
        type === "album" ? "w-1/2 max-h-[30rem]" : "w-full max-h-[25rem]"
      )}
    >
      <div className="*:whitespace-break-spaces !space-y-3">
        <AnimatePresence mode="wait">
          {selectedTrack ? (
            <motion.div
              key={selectedTrack.trackNo}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <p>{selectedTrack.lyrics}</p>
            </motion.div>
          ) : (
            <motion.div
              key="defaultInfo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <p className="!mb-6 ">{descTranslated}</p>
              <hr className="!my-4 border-black/20" />
              <p className="text-xs opacity-80 ">{albumMeta.credits}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <span className="!text-gray-500 w-full text-center">*</span>
      </div>
    </li>
  );
};

export default LyricsPanel;
