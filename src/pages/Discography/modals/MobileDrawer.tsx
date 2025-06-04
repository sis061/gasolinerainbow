import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
/************/
import type { Disk, Track } from "@/types/discography";
import useLanguageStore from "@/store/useLanguageStore";

const MobileDrawer = ({
  selectedTrack,
  albumMeta,
}: {
  selectedTrack: Track | null;
  albumMeta: Disk;
}) => {
  const { language } = useLanguageStore();
  const isKorean = language === "ko";

  const albumTitleTranslated =
    language === "ko" ? albumMeta.titleKr : albumMeta.titleEn;
  const title = albumTitleTranslated
    ? `[ ${albumTitleTranslated} ]`
    : "the Album";
  const description = isKorean ? "소개와 크레딧" : `About ${title}`;

  const trackTitleTranslated =
    language === "ko" ? selectedTrack?.titleKr : selectedTrack?.titleEn;

  return (
    <DrawerContent
      aria-describedby={selectedTrack ? "drawer-description" : undefined}
      className="flex flex-col items-center !py-6 !bg-black/90 w-full !max-h-[75dvh]"
    >
      <DrawerHeader className="w-full h-[90%] text-center !py-6 overflow-y-scroll">
        <DrawerTitle className="!text-white !pb-6">
          {selectedTrack ? trackTitleTranslated : description}
        </DrawerTitle>
        <div className="w-full h-full !overflow-y-scroll !px-6">
          {selectedTrack ? (
            <DrawerDescription className="!text-white whitespace-break-spaces">
              {selectedTrack.lyrics}
            </DrawerDescription>
          ) : (
            <div id="drawer-description">
              <p className="!mb-6 !text-white whitespace-break-spaces text-sm">
                {albumMeta.description}
              </p>
              <hr className="!my-4 border-white/20" />
              <p className="text-xs opacity-80 !text-white whitespace-break-spaces">
                {albumMeta.credits}
              </p>
            </div>
          )}
        </div>
      </DrawerHeader>
      <DrawerFooter className="h-[10%]">
        <DrawerClose asChild>
          <X size={28} color="#fff" />
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default MobileDrawer;
