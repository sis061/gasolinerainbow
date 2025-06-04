import { useState } from "react";
/************/
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
import { X } from "lucide-react";
/************/
import { useMediaQuery } from "react-responsive";
/************/
import StreamingPlatformButtons, {
  getStreamingPlatformInfo,
} from "@/components/StreamingPlatformButtons";
import useLanguageStore from "@/store/useLanguageStore";
/************/
import type { Disk } from "@/types/discography";

const StreamingModal = ({ albumMeta }: { albumMeta: Disk }) => {
  const [open, setOpen] = useState<boolean>(false);
  const minTablet = useMediaQuery({ minWidth: 768 });
  const { language } = useLanguageStore();
  const platforms = getStreamingPlatformInfo(albumMeta.urls);
  const renderType: string = albumMeta.type === "album" ? "앨범" : "노래";

  if (minTablet) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="transition-all duration-200 hover:opacity-50 cursor-pointer">
          {language === "ko" ? `${renderType} 듣기` : "Stream"}
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
          <div className="!overflow-y-scroll w-full h-full">
            <StreamingPlatformButtons
              customClassName={"!flex-col !w-full"}
              platforms={platforms}
              aria-describedby="drawer-description"
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="transition-all duration-200 hover:opacity-50 cursor-pointer">
        {language === "ko" ? `${renderType} 듣기` : "Stream"}
      </DrawerTrigger>
      <DrawerContent
        className="flex flex-col items-center !py-6 !bg-black/90 w-full !max-h-[75dvh]"
        aria-describedby="drawer-description"
      >
        <DrawerHeader className="w-full h-[90%] text-center !py-6 overflow-y-scroll">
          <DrawerTitle className="!text-white !pb-6 sr-only">
            Listen {language === "ko" ? albumMeta.titleKr : albumMeta.titleEn}
          </DrawerTitle>

          <div className="w-full h-full !overflow-y-scroll !px-6">
            <StreamingPlatformButtons
              customClassName={"max-md:flex-col max-md:!w-full"}
              platforms={platforms}
              aria-describedby="drawer-description"
            />
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
