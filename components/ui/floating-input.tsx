import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends React.ComponentProps<typeof Input> {
  label: string;
  id: string;
}

export function FloatingInput({
  label,
  id,
  className,
  ...props
}: FloatingInputProps) {
  return (
    <div className="relative">
      <Input
        id={id}
        placeholder={label}
        className={cn(
          "peer h-12 rounded-md border border-[#FF62FC] bg-transparent text-sm text-[#FF62FC] placeholder-transparent",
          "focus-visible:border-[#FF62FC] focus-visible:ring-[#FF62FC]/40",
          className
        )}
        {...props}
      />
      <Label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-black px-1 text-xs capitalize text-[#FF62FC] transition-all duration-150",
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#FF62FC]/70",
          "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-[#FF62FC]"
        )}
      >
        {label}
      </Label>
    </div>
  );
}

