import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function AdminSelector({
  isInputAvaliable = false,
  items,
  onChange,
}: {
  isInputAvaliable?: boolean;
  items: string[];
  onChange: (v: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <>
      <Select
        onValueChange={(v) => {
          setValue(v);
          onChange(v);
        }}
      >
        <SelectTrigger className="w-full max-w-48 !bg-white">
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((el) => (
              <SelectItem key={el} value={el}>
                {el}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isInputAvaliable && value === "직접입력" && (
        <input
          className="border !px-4 !py-1 !bg-white rounded-md"
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </>
  );
}
