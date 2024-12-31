import { cn } from "@/lib/utils";
import React from "react";

function Dot({ className }: { className?: string }) {
  return (
    <div
      className={cn("size-1.5 rounded-full bg-muted-foreground/50", className)}
    />
  );
}

export default Dot;
