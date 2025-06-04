import { type LyricsPanelProps } from "@/types/discography";
import { motion, AnimatePresence } from "framer-motion";

const LyricsPanel = ({
  lyricsRef,
  selectedTrack,
  albumMeta,
}: LyricsPanelProps) => {
  return (
    <li
      ref={lyricsRef}
      className="w-1/3 max-h-[85%] bg-white/75 overflow-scroll !p-10 shadow-xl flex-grow"
    >
      <div className="*:whitespace-break-spaces">
        <AnimatePresence mode="wait">
          {selectedTrack ? (
            <motion.div
              key={selectedTrack.trackNo}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {selectedTrack.lyrics}
            </motion.div>
          ) : (
            <motion.div
              key="defaultInfo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <p className="!mb-6 whitespace-break-spaces">
                {albumMeta.description}
              </p>
              <hr className="!my-4 border-black/20" />
              <p className="text-xs opacity-80 whitespace-break-spaces">
                {albumMeta.credits}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};

export default LyricsPanel;
