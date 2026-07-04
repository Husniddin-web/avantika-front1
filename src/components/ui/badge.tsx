import type {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "draft" | "published";
};

const variants = {
  default: "bg-blue-100 text-blue-800",
  secondary: "bg-slate-100 text-slate-700",
  draft: "bg-amber-100 text-amber-800",
  published: "bg-emerald-100 text-emerald-800",
};

export function Badge({className, variant = "default", ...props}: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold", variants[variant], className)}
      {...props}
    />
  );
}
