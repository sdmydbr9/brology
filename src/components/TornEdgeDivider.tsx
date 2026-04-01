import type { ComponentPropsWithoutRef } from "react";

import tornPaper from "@/assets/torn-paper-strip.png";
import { cn } from "@/lib/utils";

type TornEdgeDividerProps = ComponentPropsWithoutRef<"div">;

export const TornEdgeDivider = ({ className, ...props }: TornEdgeDividerProps) => (
  <div className={cn("pointer-events-none w-full", className)} {...props}>
    <img
      src={tornPaper}
      alt=""
      className="block h-auto w-full"
      loading="lazy"
      width={1920}
      height={512}
    />
  </div>
);
