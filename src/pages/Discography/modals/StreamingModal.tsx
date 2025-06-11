import { useState, lazy, Suspense } from "react";

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { AudioLines, X } from "lucide-react";

import { ScaleLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";

import { getStreamingPlatformInfo } from "@/components/StreamingPlatformButtons";
const StreamingPlatformButtons = lazy(
  () => import("@/components/StreamingPlatformButtons")
);
import useLanguageStore from "@/store/useLanguageStore";

import type { Disk } from "@/types/discography";
import { useScrollLock } from "@/hooks/useScrollLock";

const StreamingModal = ({ albumMeta }: { albumMeta: Disk }) => {
  const [open, setOpen] = useState<boolean>(false);
  const minTablet = useMediaQuery({ minWidth: 768 });

  useScrollLock(open);

  const { language } = useLanguageStore();
  const platforms = getStreamingPlatformInfo(albumMeta.urls);

  if (minTablet) {
    return (
      <Dialog>
        <DialogTrigger className="transition-all duration-200 hover:opacity-50 cursor-pointer group">
          <div className="w-full h-full flex items-center gap-2">
            <AudioLines
              size={16}
              className="group-hover:animate-pulse origin-center "
            />
            {language === "ko" ? `듣기` : "Stream"}
          </div>
        </DialogTrigger>
        <DialogContent
          className="flex flex-col items-center !p-10 !bg-black/90 [&_>button>svg]:!stroke-white [&_>button]:cursor-pointer"
          aria-describedby="drawer-description"
        >
          <DialogHeader>
            <DialogTitle className="!text-white !pb-6">
              {language === "ko" ? "아래에서 듣기" : "Stream"} -{" "}
              {language === "ko" ? albumMeta.titleKr : albumMeta.titleEn}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only hidden">
            스트리밍 목록
          </DialogDescription>
          <div className="!overflow-y-scroll w-full h-full flex items-center justify-center">
            <Suspense
              fallback={
                <ScaleLoader
                  color="#BFBFBF"
                  barCount={7}
                  height={20}
                  margin={3}
                  radius={0}
                  width={3}
                />
              }
            >
              <StreamingPlatformButtons
                customClassName={"!flex-col !w-full"}
                platforms={platforms}
                aria-describedby="drawer-description"
              />
            </Suspense>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="transition-all duration-200 hover:opacity-50 cursor-pointer">
        <div className="w-full h-full flex items-center gap-2">
          <AudioLines size={16} />
          {language === "ko" ? `듣기` : "Stream"}
        </div>
      </DrawerTrigger>
      <DrawerContent
        className="flex flex-col items-center !py-6 !bg-black/90 w-full !max-h-[75dvh]"
        aria-describedby="drawer-description"
      >
        <DrawerHeader className="w-full h-[90%] text-center !py-6 overflow-y-scroll">
          <DrawerTitle className="!text-white !pb-6 sr-only">
            Listen {language === "ko" ? albumMeta.titleKr : albumMeta.titleEn}
          </DrawerTitle>

          <div className="!w-full !h-full !overflow-y-scroll !px-6 flex items-center justify-center">
            <Suspense
              fallback={
                <ScaleLoader
                  color="#BFBFBF"
                  barCount={7}
                  height={20}
                  margin={3}
                  radius={0}
                  width={3}
                />
              }
            >
              <StreamingPlatformButtons
                customClassName={"!flex-col !w-full"}
                platforms={platforms}
                aria-describedby="drawer-description"
              />
            </Suspense>
          </div>
        </DrawerHeader>
        <DrawerDescription className="sr-only">스트리밍 목록</DrawerDescription>
        <DrawerFooter className="h-[10%]">
          <DrawerClose asChild>
            <X size={28} color="#fff" />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default StreamingModal;
