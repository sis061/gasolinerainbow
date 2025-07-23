import { Badge, badgeVariants } from "@/components/ui/badge";
import cx from "classnames";
import { parseDateString } from "@/utils/globalHelper";
import type { VariantProps } from "class-variance-authority";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
type Placement = "top-right" | "top-left" | "bottom-right" | "bottom-left";
type ExpireIn = "1day" | "3days" | "1week" | "2weeks" | "1month" | "1year";

interface CustomBadgeProps {
  variant?: BadgeVariant;
  placement?: Placement;
  label: string;
  startDate: string;
  expireIn: ExpireIn;
}

const TODAY = new Date();

const calcExpireDate = (startDate: string, expireIn: ExpireIn): Date => {
  const date = parseDateString(startDate);
  const expireDate = new Date(date);

  switch (expireIn) {
    case "1day":
      expireDate.setDate(expireDate.getDate() + 1);
      break;
    case "3days":
      expireDate.setDate(expireDate.getDate() + 3);
      break;
    case "1week":
      expireDate.setDate(expireDate.getDate() + 7);
      break;
    case "2weeks":
      expireDate.setDate(expireDate.getDate() + 14);
      break;
    case "1month":
      expireDate.setMonth(expireDate.getMonth() + 1);
      break;
    case "1year":
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      break;
  }

  return expireDate;
};

const getPlacementClasses = (placement: Placement) => {
  const placementMap: Record<Placement, string[]> = {
    "top-right": ["top-1", "right-1", "rounded-bl-none"],
    "top-left": ["top-1", "left-1", "rounded-br-none"],
    "bottom-right": ["bottom-1", "right-1", "rounded-tl-none"],
    "bottom-left": ["bottom-1", "left-1", "rounded-tr-none"],
  };

  return placementMap[placement];
};

const CustomBadge = ({
  variant = "destructive",
  placement = "top-right",
  label = "N",
  startDate,
  expireIn = "2weeks",
}: CustomBadgeProps) => {
  const expireDate = calcExpireDate(startDate, expireIn);

  if (TODAY > expireDate) {
    return <></>;
  }

  return (
    <Badge
      variant={variant}
      className={cx(
        "absolute !z-[999] !text-white border-b-1 border-b-white/25 !py-1 !px-2 rounded-full animate-pulse shadow-2xl",
        getPlacementClasses(placement)
      )}
    >
      {label}
    </Badge>
  );
};

export default CustomBadge;
