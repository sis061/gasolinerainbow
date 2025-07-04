import type { ReactElement } from "react";

import { toast } from "sonner";
import { X } from "lucide-react";

export interface CustomToastProps {
  t: string | number;
  icon: ReactElement;
  content: string;
}

const CustomToast = ({ t, icon, content }: CustomToastProps) => {
  return (
    <div className="flex flex-col min-w-80 bg-accent !px-6 !py-4 relative border-1 border-black/75 rounded-xs">
      <button
        onClick={() => toast.dismiss(t)}
        className="absolute top-2 right-2 cursor-pointer hover:animate-pulse"
      >
        <X size={16} color="#000" />
      </button>
      <div className="flex items-center justify-start gap-1 w-full">
        {icon}
        <span className="!text-black text-sm">{content}</span>
      </div>
    </div>
  );
};

export default CustomToast;
