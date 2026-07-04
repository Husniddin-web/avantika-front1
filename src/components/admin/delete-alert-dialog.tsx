"use client";

import {AlertTriangle} from "lucide-react";

import {Button} from "@/components/ui/button";

type DeleteAlertDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteAlertDialog({
  open,
  title = "Delete item?",
  description = "This action cannot be undone.",
  loading = false,
  onCancel,
  onConfirm,
}: DeleteAlertDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/25">
        <div className="flex gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
