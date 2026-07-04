import type {ButtonHTMLAttributes} from "react";
import {cn} from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline" | "ghost" | "danger";
  size?: "default" | "sm" | "icon";
};

const variants = {
  default: "bg-blue-700 text-white hover:bg-blue-800",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 text-xs",
  icon: "size-10",
};

export function Button({className, variant = "default", size = "default", ...props}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
