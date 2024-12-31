import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  className?: string;
};

function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto max-w-screen-xl p-2 px-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
