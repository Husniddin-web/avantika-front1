import type {HTMLAttributes} from "react";
import {cn} from "@/lib/utils";

export function Card({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-950/[0.03]", className)} {...props} />;
}

export function CardHeader({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-slate-100 p-5", className)} {...props} />;
}

export function CardTitle({className, ...props}: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-bold text-slate-950", className)} {...props} />;
}

export function CardContent({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}
