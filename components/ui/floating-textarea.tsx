import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FloatingTextareaProps
  extends React.ComponentProps<"textarea"> {
  label: string;
  id: string;
}

export function FloatingTextarea({
  label,
  id,
  className,
  ...props
}: FloatingTextareaProps) {
  return (
    <div className="relative">
      <textarea
        id={id}
        placeholder={label}
        className={cn(
          "peer h-40 w-full resize-none rounded-2xl border border-[#FF62FC] bg-black/40 px-3 py-3 text-sm text-[#FF62FC] outline-none placeholder-transparent",
          "focus-visible:border-[#FF62FC] focus-visible:ring-[#FF62FC]/40 focus-visible:ring-[3px]",
          className
        )}
        {...props}
      />
      <Label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-black px-1 text-xs capitalize text-[#FF62FC] transition-all duration-150",
          "peer-placeholder-shown:top-[1.125rem] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#FF62FC]/70",
          "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-[#FF62FC]"
        )}
      >
        {label}
      </Label>
    </div>
  );
}
