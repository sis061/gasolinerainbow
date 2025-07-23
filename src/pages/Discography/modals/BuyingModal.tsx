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
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Disc3, X } from "lucide-react";
import { ScaleLoader } from "react-spinners";

import cx from "classnames";
import map from "lodash/map";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { getStreamingPlatformInfo } from "@/components/StreamingPlatformButtons";
const StreamingPlatformButtons = lazy(
  () => import("@/components/StreamingPlatformButtons")
);
import useLanguageStore from "@/store/useLanguageStore";

import type { Disk } from "@/types/discography";
// import { useScrollLock } from "@/hooks/useScrollLock";

const BuyingModal = ({ albumMeta }: { albumMeta: Disk }) => {
  const { urls, isCD, titleKr, titleEn } = albumMeta;
  const [open, setOpen] = useState<boolean>(false);
  const minTablet = useMediaQuery({ minWidth: 768 });

  // useScrollLock(open);
  const { language } = useLanguageStore();

  const bandcampUrl = Object.fromEntries(
    Object.entries(urls).filter(([key]) => ["bandcamp"].includes(key))
  );
  const isBandcampAvailable = bandcampUrl.bandcamp.length > 0;
  const bandcampBtn = bandcampUrl && getStreamingPlatformInfo(bandcampUrl);

  const maansunPurchaseData = {
    labelKr: "만선",
    labelEn: "maansun",
    color: "#D62C28",
    url: albumMeta?.maansunUrl ? albumMeta?.maansunUrl : "",
  };

  const CDpurchaseData = albumMeta?.cdUrl;

  if (minTablet) {
    return (
      <Dialog>
        <DialogTrigger className="transition-all duration-200 hover:opacity-50 cursor-pointer group">
          <div className="w-full h-full flex items-center gap-2">
            <Disc3
              size={16}
              className="group-hover:animate-spin origin-center"
            />
            {language === "ko" ? "구매" : "Order"}
          </div>
        </DialogTrigger>
        <DialogContent
          className="flex flex-col items-center !p-10 !bg-black/90 [&_>button>svg]:!stroke-white [&_>button]:cursor-pointer rounded-xs border-white/25"
          aria-describedby="drawer-description"
        >
          <DialogHeader>
            <DialogTitle className="!text-white !pb-6">
              {language === "ko" ? "아래에서 구매" : "Order"} -{" "}
              {language === "ko" ? titleKr : titleEn}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only hidden">
            구매 목록
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
              <ul className=" w-full [&_>li]:*:!text-white [&_>li]:!space-y-3">
                <li>
                  <h3>{language === "ko" ? "다운로드" : "Download"}</h3>
                  {!!albumMeta?.maansunUrl && (
                    <div>
                      <DirectButton
                        cdUrl={maansunPurchaseData.url}
                        labelKr={maansunPurchaseData.labelKr}
                        labelEn={maansunPurchaseData.labelEn}
                        bgColor={maansunPurchaseData.color}
                        language={language}
                      />
                    </div>
                  )}
                  {isBandcampAvailable && (
                    <StreamingPlatformButtons
                      customClassName={"!flex-col !w-full"}
                      platforms={bandcampBtn}
                      aria-describedby="drawer-description"
                    />
                  )}
                </li>
                {isCD && albumMeta?.cdUrl && (
                  <li>
                    <Separator className="h-[0.5px] !bg-white/20 !my-6" />
                    <h3>CD</h3>
                    <div className="flex flex-col gap-3">
                      {map(CDpurchaseData, (cd) => (
                        <DirectButton
                          key={cd.store.toLowerCase()}
                          cdUrl={cd.url}
                          labelKr={cd.store}
                          labelEn={cd.store}
                          bgColor={cd.color}
                          language={language}
                        />
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            </Suspense>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="transition-all duration-200 hover:opacity-50 cursor-pointer ">
        <div className="w-full h-full flex items-center gap-2">
          <Disc3 size={16} />
          {language === "ko" ? "구매" : "Order"}
        </div>
      </DrawerTrigger>
      <DrawerContent
        className="flex flex-col items-center !py-6 !bg-black/90 w-full !max-h-[75dvh]"
        aria-describedby="drawer-description"
      >
        <DrawerHeader className="w-full h-[90%] text-center !py-6 overflow-y-scroll">
          <DrawerTitle className="!text-white !pb-6 sr-only">
            {language === "ko" ? titleKr : titleEn}
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
              <ul className=" w-full [&_>li]:*:!text-white [&_>li]:!space-y-3 [&_h3]:!text-left">
                <li>
                  <h3>{language === "ko" ? "다운로드" : "Download"}</h3>
                  {!!albumMeta?.maansunUrl && (
                    <div>
                      <DirectButton
                        cdUrl={maansunPurchaseData.url}
                        labelKr={maansunPurchaseData.labelKr}
                        labelEn={maansunPurchaseData.labelEn}
                        bgColor={maansunPurchaseData.color}
                        language={language}
                      />
                    </div>
                  )}
                  {isBandcampAvailable && (
                    <StreamingPlatformButtons
                      customClassName={"!flex-col !w-full"}
                      platforms={bandcampBtn}
                      aria-describedby="drawer-description"
                    />
                  )}
                </li>
                {isCD && albumMeta?.cdUrl && (
                  <li>
                    <Separator className="h-[0.5px] !bg-white/20 !my-6" />
                    <h3>CD</h3>
                    <div className="flex flex-col w-full gap-3">
                      {map(CDpurchaseData, (cd) => (
                        <DirectButton
                          key={cd.store.toLowerCase()}
                          cdUrl={cd.url}
                          labelKr={cd.store}
                          labelEn={cd.store}
                          bgColor={cd.color}
                          language={language}
                        />
                      ))}
                    </div>
                  </li>
                )}
              </ul>
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

export default BuyingModal;

const DirectButton = ({
  cdUrl,
  language,
  bgColor,
  labelKr,
  labelEn,
}: {
  cdUrl: string;
  language: "ko" | "en";
  bgColor: string;
  labelKr: string;
  labelEn: string;
}) => {
  return (
    <Link to={cdUrl} target="_blank" rel="noopener noreferrer">
      <Button
        variant="default"
        style={{ backgroundColor: bgColor }}
        className={`w-full min-w-fit !px-3 !py-2 hover:opacity-75 cursor-pointer rounded-xs`}
      >
        <span
          className={cx("!text-white text-sm", language === "en" && "text-xs")}
        >
          {language === "ko" ? labelKr : labelEn}
        </span>
      </Button>
    </Link>
  );
};
