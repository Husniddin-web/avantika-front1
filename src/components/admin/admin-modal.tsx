"use client";

import {X} from "lucide-react";
import type {ReactNode} from "react";

import {Button} from "@/components/ui/button";

type AdminModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  width?: "md" | "lg" | "xl";
};

const widths = {
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function AdminModal({open, title, children, onClose, width = "lg"}: AdminModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className={`max-h-[calc(100vh-2rem)] w-full overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-950/25 ${widths[width]}`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-extrabold text-slate-950">{title}</h2>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
            <X className="size-5" />
          </Button>
        </div>
        <div className="max-h-[calc(100vh-7rem)] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
